var userModel = require("../../models/user.model");

exports.list = async (req, res, next) => {
  let dataReturn = {
    status: 200,
    msg: "ok",
    data: [],
  };
  try {
    let list = await userModel.userModel.find().sort({ _id: -1 });
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
    let user = new userModel.userModel();
    user.username = req.body.username;
    user.password = req.body.password;
    user.email = req.body.email;
    user.fullname = req.body.fullname;
    user.role = req.body.role;
    user.avatar = "https://cdn-icons-png.flaticon.com/512/3177/3177440.png";
    await user.save();
    dataReturn.msg = "Thêm thành công";
    dataReturn.status = 200;
    res.json(dataReturn);
  } catch (err) {
    dataReturn.msg = err.message;
    dataReturn.status = 500;
    return res.json(dataReturn);
  }
};

exports.viewByUsername = async (req, res, next) => {
  let dataReturn = {
    status: 200,
    msg: "ok",
  };
  try {
    const user = await userModel.userModel.findOne({
      username: req.params.username,
    });
    dataReturn.data = user;
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

exports.viewById = async (req, res, next) => {
  let dataReturn = {
    status: 200,
    msg: "ok",
  };
  try {
    const user = await userModel.userModel.findOne({
      _id: req.params.id,
    });
    dataReturn.data = user;
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

exports.edit = async (req, res, next) => {
  let dataReturn = {
    status: 200,
    msg: "ok",
  };
  try {
    let user = {
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      fullname: req.body.fullname,
      role: req.body.role,
      avatar: req.body.avatar,
    };
    await userModel.userModel.updateOne({ _id: req.params.id }, user);
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
    await userModel.userModel.deleteOne({ _id: req.params.id });
    dataReturn.msg = "Xóa thành công";
    dataReturn.status = 200;
    res.json(dataReturn);
  } catch (err) {
    dataReturn.msg = err.message;
    dataReturn.status = 500;
    return res.json(dataReturn);
  }
};
