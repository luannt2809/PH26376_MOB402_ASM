exports.list = (req, res, next) => {
  let userInfor = req.session.userLogin;
  res.render("bills/list", { userInfor: userInfor });
};
