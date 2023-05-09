var express = require("express");
var router = express.Router();
var homeController = require("../controllers/home.controller.js");
var checkLogin = require("../middleware/checkLogin");

/* GET home page. */
router.get("/", checkLogin.requireLogin, homeController.index);

router.get("/logout", checkLogin.requireLogin, homeController.logout);

module.exports = router;
