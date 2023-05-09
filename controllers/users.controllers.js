const userModel = require("../models/user.model");

exports.list = async (req, res, next) => {
  try {
    const searchKeyword = req.query.keyword || "";
    const sortField = req.query.sort || "username";
    const sortOrder = req.query.order === "asc" ? 1 : -1;

    const query = {};

    if (searchKeyword) {
      query.username = { $regex: searchKeyword, $options: "i" };
    }

    let perPage = 5;
    let page = req.query.page || 1;

    let users = await userModel.userModel
      .find(query)
      .skip(perPage * page - perPage)
      .limit(perPage)
      .sort({ [sortField]: sortOrder })
      .exec();

    const count = await userModel.userModel.countDocuments();

    let userInfor = req.session.userLogin;

    res.render("users/list", {
      users: users,
      userInfor: userInfor,
      searchKeyword: searchKeyword,
      sortField: sortField,
      sortOrder: sortOrder,
      current: page,
      pages: Math.ceil(count / perPage),
    });
  } catch (error) {
    console.error(error);
  }
};

//*---------- POST USER
exports.addUser = (req, res, next) => {
  let userInfor = req.session.userLogin;
  let msg = "";
  res.render("users/add", { userInfor: userInfor, msg: msg });
};

exports.postUser = async (req, res, next) => {
  let userInfor = req.session.userLogin;
  let msg = "";
  if (req.method == "POST") {
    const checkUsername = await userModel.userModel.findOne({
      username: req.body.username,
    });
    if (checkUsername) {
      msg = "Username đã tồn tại";
      return res.render("users/add", { userInfor: userInfor, msg: msg });
    }
    let user = new userModel.userModel();
    user.username = req.body.username;
    user.password = req.body.password;
    user.email = req.body.email;
    user.fullname = req.body.fullname;
    user.role = req.body.role;
    user.avatar = "https://cdn-icons-png.flaticon.com/512/3177/3177440.png";
    try {
      let newUser = await user.save();
      console.log(newUser);
      res.redirect("/users");
    } catch (err) {
      console.error(err);
    }
  }
};

//*=============

//*---------- VIEW USER DATA
exports.viewUser = async (req, res, next) => {
  try {
    const user = await userModel.userModel.findOne({ _id: req.params.id });
    let userInfor = req.session.userLogin;

    res.render("users/view", { user: user, userInfor: userInfor });
  } catch (err) {
    console.error(err);
  }
};

//*=============

//*---------- GET USER DATA (PUT)
exports.editUser = async (req, res, next) => {
  try {
    const user = await userModel.userModel.findOne({ _id: req.params.id });
    let userInfor = req.session.userLogin;

    res.render("users/edit", { user: user, userInfor: userInfor });
  } catch (err) {
    console.error(err);
  }
};

exports.putUser = async (req, res, next) => {
  const user = await userModel.userModel.findOne({ _id: req.params.id });

  try {
    if (!req.body.password) {
      const oldPasswd = user.password;
      user.password = oldPasswd;
      await userModel.userModel.findByIdAndUpdate(req.params.id, {
        username: req.body.username,
        password: oldPasswd,
        email: req.body.email,
        fullname: req.body.fullname,
        role: req.body.role,
      });
      await res.redirect(`/users/edit/${req.params.id}`);
    } else {
      await userModel.userModel.findByIdAndUpdate(req.params.id, {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        fullname: req.body.fullname,
        role: req.body.role,
      });
      await res.redirect(`/users/edit/${req.params.id}`);
    }
  } catch (err) {
    console.error(err);
  }
};

//*=============

//*---------- DELETE USER DATA
exports.deleteUser = async (req, res, next) => {
  try {
    await userModel.userModel.deleteOne({ _id: req.params.id });
    res.redirect("/users");
  } catch (err) {
    console.error(err);
  }
};

//*=============
