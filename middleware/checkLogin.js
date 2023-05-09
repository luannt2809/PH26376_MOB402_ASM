exports.requireLogin = (req, res, next) => {
  if (req.session.userLogin) {
    next();
  } else {
    res.redirect("/login");
  }
};

exports.noRequireLogin = (req, res, next) => {
  if (!req.session.userLogin) {
    next();
  } else {
    res.redirect("/");
  }
};
