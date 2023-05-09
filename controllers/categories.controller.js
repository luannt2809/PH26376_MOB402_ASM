var cateModel = require("../models/products.model");

exports.list = async (req, res, next) => {
  try {
    let userInfor = req.session.userLogin;
    const categories = await cateModel.cateModel.find();
    res.render("categories/list", {
      userInfor: userInfor,
      categories: categories,
    });
  } catch (err) {
    console.error(err);
  }
};

//--------POST Product-------------
exports.addCate = (req, res, next) => {
  try {
    let userInfor = req.session.userLogin;

    res.render("categories/add", {
      userInfor: userInfor,
    });
  } catch (err) {
    console.error(err);
  }
};

exports.postCate = async (req, res, next) => {
  try {
    let userInfor = req.session.userLogin;
    const newCate = new cateModel.cateModel({
      name: req.body.name,
    });
    await cateModel.cateModel.create(newCate);
    res.redirect("/categories");
  } catch (err) {
    console.error(err);
  }
};
//---------------------------------

//--------GET Category DATA (Xem chi tiết)-------------
exports.view = async (req, res, next) => {
  try {
    const category = await cateModel.cateModel.findOne({
      _id: req.params.id,
    });
    let userInfor = req.session.userLogin;

    res.render("categories/view", { category: category, userInfor: userInfor });
  } catch (err) {
    console.error(err);
  }
};
//---------------------------------

//--------GET Category DATA (PUT)-------------
exports.editCate = async (req, res, next) => {
  try {
    const category = await cateModel.cateModel.findOne({
      _id: req.params.id,
    });
    let userInfor = req.session.userLogin;

    res.render("categories/edit", {
      category: category,
      userInfor: userInfor,
    });
  } catch (err) {
    console.error(err);
  }
};

exports.putCate = async (req, res, next) => {
  try {
    await cateModel.cateModel.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
    });
    await res.redirect(`/categories`);
  } catch (err) {
    console.error(err);
  }
};
//---------------------------------

//--------DELETE Category DATA-------------
exports.deleteProduct = async (req, res, next) => {
  try {
    await cateModel.cateModel.deleteOne({ _id: req.params.id });
    res.redirect("/categories");
  } catch (err) {
    console.error(err);
  }
};

//---------------------------------
