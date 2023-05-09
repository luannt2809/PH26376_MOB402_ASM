var express = require("express");
var router = express.Router();
var billsController = require("../controllers/bills.controller");
var checkLogin = require("../middleware/checkLogin");

router.get("/", checkLogin.requireLogin, billsController.list);

module.exports = router;
