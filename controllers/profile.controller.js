const userModel = require("../models/user.model");

exports.getProfile = async (req, res, next) => {
  let userInfor = req.session.userLogin;
  let msg = "";
  try {
    const user = await userModel.userModel.findOne({ _id: req.params.id });
    res.render("profile/profile", {
      userInfor: userInfor,
      user: user,
      msg: msg,
    });
  } catch (err) {
    console.error(err);
  }
};

exports.putProfile = async (req, res, next) => {
  const user = await userModel.userModel.findOne({ _id: req.params.id });
  let userInfor = req.session.userLogin;

  try {
    const checkUsername = await userModel.userModel.findOne({
      username: req.body.username,
    });
    if (checkUsername) {
      msg = "Username đã tồn tại";
      return res.render("profile/profile", {
        userInfor: userInfor,
        msg: msg,
        user: user,
      });
    }
    if (!req.body.passwd) {
      const oldPasswd = user.password;
      user.password = oldPasswd;
      await userModel.userModel.findByIdAndUpdate(req.params.id, {
        username: req.body.username,
        password: oldPasswd,
        email: req.body.email,
        fullname: req.body.fullname,
      });
      await res.redirect(`/profile/${req.params.id}`);
    } else {
      await userModel.userModel.findByIdAndUpdate(req.params.id, {
        username: req.body.username,
        password: req.body.passwd,
        email: req.body.email,
        fullname: req.body.fullname,
      });
      await res.redirect(`/profile/${req.params.id}`);
    }
  } catch (err) {
    console.error(err);
  }
};
