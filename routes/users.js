var express = require("express");
var router = express.Router();
var usersController = require("../controllers/users.controllers");
var checkLogin = require("../middleware/checkLogin");

/* GET users listing. */
router.get("/", checkLogin.requireLogin, usersController.list);

// get view add user
router.get("/add", checkLogin.requireLogin, usersController.addUser);
router.post("/add", checkLogin.requireLogin, usersController.postUser);

router.get("/view/:id", checkLogin.requireLogin, usersController.viewUser);

router.get("/edit/:id", checkLogin.requireLogin, usersController.editUser);
router.put("/edit/:id", checkLogin.requireLogin, usersController.putUser);
router.delete("/edit/:id", checkLogin.requireLogin, usersController.deleteUser);

module.exports = router;
