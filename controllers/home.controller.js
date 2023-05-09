const userModel = require("../models/user.model");
const productModel = require("../models/products.model");

exports.index = async (req, res, next) => {
  let userInfor = req.session.userLogin;
  let countUser = await userModel.userModel.countDocuments();
  let countProduct = await productModel.productModel.countDocuments();
  res.render("home/index", {
    userInfor: userInfor,
    countUser: countUser,
    countProduct: countProduct,
  });
};

exports.logout = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
    } else {
      res.redirect("/login");
    }
  });
};
