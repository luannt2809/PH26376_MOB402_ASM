const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");

exports.login = async (req, res, next) => {
  let msg = "";
  if (req.method == "POST") {
    console.log(req.body);
    try {
      let user = await userModel.userModel.findOne({
        username: req.body.username,
      });

      if (user != null) {
        let checkpass = bcrypt.compare(req.body.passwd, user.password);
        if (user.role != "Admin") {
          msg = "Bạn không phải là quản trị viên.";
        } else if (req.body.passwd == user.password) {
          req.session.userLogin = user;
          msg = "";
          return res.redirect("/");
        } else {
          msg = "Sai mật khẩu.";
        }
      } else {
        msg = "Tài khoản không tồn tại.";
      }
    } catch (err) {
      console.error(err);
    }
  }
  res.render("login/login", { msg: msg });
};
