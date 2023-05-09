var express = require("express");
var router = express.Router();
var cateController = require("../controllers/categories.controller");
var middleware = require("../middleware/checkLogin");

router.get("/", middleware.requireLogin, cateController.list);

router.get("/add", middleware.requireLogin, cateController.addCate);
router.post("/add", middleware.requireLogin, cateController.postCate);

router.get("/view/:id", middleware.requireLogin, cateController.view);

router.get("/edit/:id", middleware.requireLogin, cateController.editCate);
router.put("/edit/:id", middleware.requireLogin, cateController.putCate);

router.delete("/edit/:id", middleware.requireLogin, cateController.deleteProduct);

module.exports = router;
