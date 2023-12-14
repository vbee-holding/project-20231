const isAuthenticated = (req, res, next) => {
  if (req.session.passport.user) {
    next();
  } else {
    res.redirect("/login");
  }
};

module.exports = isAuthenticated;
