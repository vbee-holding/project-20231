const isAuthenticated = (req, res, next) => {
  if (req.session.passport?.user !== undefined) {
    next();
  } else {
    res.redirect("/user/login");
  }
};

module.exports = isAuthenticated;
