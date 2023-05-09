const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");

exports.register = async (req, res, next) => {
  let msg = "";
  if (req.method == "POST") {
    console.log(req.body);
    const checkUsername = await userModel.userModel.findOne({
      username: req.body.username,
    });
    if (checkUsername) {
      msg = "Username đã tồn tại.";
      return res.render("register/register", { msg: msg });
    }
    if (req.body.passwd != req.body.confirmpasswd) {
      msg = "Xác nhận mật khẩu không trùng khớp.";
      return res.render("register/register", { msg: msg });
    }
    let newUser = new userModel.userModel();
    newUser.username = req.body.username;

    const salt = await bcrypt.genSalt(15);
    // newUser.password = await bcrypt.hash(req.body.passwd, salt);
    newUser.password = req.body.passwd;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const email = req.body.email;
    if (emailRegex.test(email)) {
      newUser.email = email;
    } else {
      msg = "Email không hợp lệ.";
      return res.render("register/register", { msg: msg });
    }

    newUser.fullname = req.body.fullname;
    newUser.avatar = "https://cdn-icons-png.flaticon.com/512/3177/3177440.png";
    newUser.role = "Admin";
    try {
      await newUser.save();
      res.redirect("/login");
    } catch (err) {
      console.error(err);
    }
  }
  res.render("register/register", { msg: msg });
};
