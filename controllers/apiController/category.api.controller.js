var cateModel = require("../../models/products.model");

exports.list = async (req, res, next) => {
  let dataReturn = {
    status: 200,
    msg: "ok",
    data: [],
  };
  try {
    let list = await cateModel.cateModel.find().sort({ _id: -1 });
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
    let category = new cateModel.cateModel();
    category.name = req.body.name;
    await category.save();
    dataReturn.msg = "Thêm thành công";
    dataReturn.status = 200;
    res.json(dataReturn);
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
    let category = {
      name: req.body.name,
    };
    await cateModel.cateModel.updateOne({ _id: req.params.id }, category);
    dataReturn.msg = "Sửa thành công";
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
  };
  try {
    const category = await cateModel.cateModel.findOne({
      _id: req.params.id,
    });
    dataReturn.data = category;
    dataReturn.msg = "Lấy dữ liệu thành công";
    dataReturn.status = 200;
    res.json(dataReturn);
  } catch (err) {
    dataReturn.data = [];
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
    await cateModel.cateModel.deleteOne({ _id: req.params.id });
    dataReturn.msg = "Xóa thành công";
    dataReturn.status = 200;
    res.json(dataReturn);
  } catch (err) {
    dataReturn.msg = err.message;
    dataReturn.status = 500;
    return res.json(dataReturn);
  }
};
