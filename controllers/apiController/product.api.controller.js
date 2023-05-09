var productModel = require("../../models/products.model");

exports.list = async (req, res, next) => {
  let dataReturn = {
    status: 200,
    msg: "ok",
    data: [],
  };
  try {
    let list = await productModel.productModel
      .find()
      .sort({ _id: -1 })
      .populate("cateId");
    if (list) {
      dataReturn.msg = "Lấy dữ liệu thành công";
      dataReturn.status = 200;
      dataReturn.data = list;
      res.json(dataReturn);
    } else {
      dataReturn.msg = "Không có dữ liệu";
      dataReturn.status = 204;
      dataReturn.data = list;
      return res.json(dataReturn);
    }
  } catch (err) {
    dataReturn.msg = err.message;
    dataReturn.status = 500;
    return res.json(dataReturn);
  }
};

exports.add = async (req, res, next) => {
  let dataReturn = {
    status: 200,
    msg: "ok",
  };

  try {
    let product = new productModel.productModel();
    product.name = req.body.name;
    product.price = req.body.price;
    product.desc = req.body.desc;
    product.image = req.body.image;
    product.cateId = req.body.cateId;
    await product.save();
    dataReturn.msg = "Thêm thành công";
    dataReturn.status = 200;
    res.json(dataReturn);
  } catch (err) {
    dataReturn.msg = err.message;
    dataReturn.status = 500;
    return res.json(dataReturn);
  }
};

exports.view = async (req, res, next) => {
  let dataReturn = {
    status: 200,
    msg: "ok",
    data: [],
  };
  try {
    const product = await productModel.productModel
      .findOne({
        _id: req.params.id,
      })
      .populate("cateId");
    if (product) {
      dataReturn.msg = "Lấy dữ liệu thành công";
      dataReturn.status = 200;
      dataReturn.data = product;
      res.json(dataReturn);
    } else {
      dataReturn.msg = "Không có dữ liệu";
      dataReturn.status = 204;
      dataReturn.data = [];
      return res.json(dataReturn);
    }
  } catch (err) {
    dataReturn.msg = err.message;
    dataReturn.status = 500;
    return res.json(dataReturn);
  }
};

exports.edit = async (req, res, next) => {
  let dataReturn = {
    status: 200,
    msg: "ok",
  };
  try {
    let product = {
      name: req.body.name,
      price: req.body.price,
      desc: req.body.desc,
      image: req.body.image,
      cateId: req.body.cateId,
    };
    await productModel.productModel.updateOne({ _id: req.params.id }, product);
    dataReturn.msg = "Sửa thành công";
    dataReturn.status = 200;
    res.json(dataReturn);
  } catch (err) {
    dataReturn.msg = err.message;
    dataReturn.status = 500;
    return res.json(dataReturn);
  }
};

exports.delete = async (req, res, next) => {
  let dataReturn = {
    status: 200,
    msg: "ok",
  };

  try {
    await productModel.productModel.deleteOne({ _id: req.params.id });
    dataReturn.msg = "Xóa thành công";
    dataReturn.status = 200;
    res.json(dataReturn);
  } catch (err) {
    dataReturn.msg = err.message;
    dataReturn.status = 500;
    return res.json(dataReturn);
  }
};

exports.search = async (req, res, next) => {
  let dataReturn = {
    status: 200,
    msg: "ok",
    data: [],
  };
  const searchKeyword = req.query.keyword || "";

  const query = {};

  if (searchKeyword) {
    query.name = { $regex: searchKeyword, $options: "i" };
  }

  try {
    let products = await productModel.productModel
      .find(query)
      .sort({ _id: -1 })
      .populate("cateId");
    if (products) {
      dataReturn.msg = "Lấy dữ liệu thành công";
      dataReturn.status = 200;
      dataReturn.data = products;
      res.json(dataReturn);
    } else {
      dataReturn.msg = "Không có dữ liệu";
      dataReturn.status = 204;
      dataReturn.data = [];
      return res.json(dataReturn);
    }
  } catch (err) {
    dataReturn.msg = err.message;
    dataReturn.status = 500;
    return res.json(dataReturn);
  }
};
