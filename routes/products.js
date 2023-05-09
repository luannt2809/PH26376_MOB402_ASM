var express = require("express");
var router = express.Router();
var productsController = require("../controllers/products.controller");
var checkLogin = require("../middleware/checkLogin");
var multer = require("multer");
var uploader = multer({ dest: "./tmp" });

router.get("/", checkLogin.requireLogin, productsController.list);
// router.get("/search", checkLogin.requireLogin, productsController.searchCate);

router.get("/add", checkLogin.requireLogin, productsController.addProduct);
router.post(
  "/add",
  checkLogin.requireLogin,
  uploader.single("image"),
  productsController.postProduct
);

router.get("/view/:id", checkLogin.requireLogin, productsController.view);

router.get(
  "/edit/:id",
  checkLogin.requireLogin,
  productsController.editProduct
);
router.put(
  "/edit/:id",
  checkLogin.requireLogin,
  uploader.single("image"),
  productsController.putProduct
);

router.delete(
  "/edit/:id",
  checkLogin.requireLogin,
  productsController.deleteProduct
);

module.exports = router;
