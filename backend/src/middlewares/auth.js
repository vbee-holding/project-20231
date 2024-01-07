const isAuthenticated = (req, res, next) => {
  if (req.session.passport?.user !== undefined) {
    next();
    console.log(req, res, next);
  } else {
    console.log(res, next);
    res.redirect("/user/login");
  }
};

module.exports = isAuthenticated;
