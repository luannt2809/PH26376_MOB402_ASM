var express = require("express");
var router = express.Router();
var profileController = require("../controllers/profile.controller");
var checkLogin = require("../middleware/checkLogin");

router.get("/", checkLogin.requireLogin, profileController.getProfile);
router.get("/:id", checkLogin.requireLogin, profileController.getProfile);
router.put("/:id", checkLogin.requireLogin, profileController.putProfile);

module.exports = router;
