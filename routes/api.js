var express = require("express");
var router = express.Router();
var userAPIController = require("../controllers/apiController/user.api.controller");
var cateAPIController = require("../controllers/apiController/category.api.controller");
var productAPIController = require("../controllers/apiController/product.api.controller");

//---------User API-------------------------
router.get("/users", userAPIController.list);
router.post("/users/add", userAPIController.add);
router.get("/users/viewusername/:username", userAPIController.viewByUsername);
router.get("/users/viewid/:id", userAPIController.viewById);
router.put("/users/edit/:id", userAPIController.edit);
router.delete("/users/delete/:id", userAPIController.delete);
//------------------------------------------

//---------Category API-------------------------
router.get("/categories", cateAPIController.list);
router.post("/categories/add", cateAPIController.add);
router.get("/categories/view/:id", cateAPIController.view);
router.put("/categories/edit/:id", cateAPIController.edit);
router.delete("/categories/delete/:id", cateAPIController.delete);
//----------------------------------------------

//---------Product API-------------------------
router.get("/products", productAPIController.list);
router.get("/products/view/:id", productAPIController.view);
router.get("/products/search", productAPIController.search);
router.post("/products/add", productAPIController.add);
router.put("/products/edit/:id", productAPIController.edit);
router.delete("/products/delete/:id", productAPIController.delete);
//----------------------------------------------

module.exports = router;
