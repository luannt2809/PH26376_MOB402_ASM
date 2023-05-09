var express = require("express");
var router = express.Router();
var registerController = require("../controllers/register.controller");
var checkLogin = require("../middleware/checkLogin");

router.get("/", checkLogin.noRequireLogin, registerController.register);
router.post("/", checkLogin.noRequireLogin, registerController.register);

module.exports = router;
