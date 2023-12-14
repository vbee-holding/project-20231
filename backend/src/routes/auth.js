const express = require("express");
const passport = require("passport");

const isAuthenticated = require("../middlewares/auth");
const router = express.Router();

router.get("/", (req, res) => {
  res.send(
    `<div>
      <div>Home page</div>
      <button><a href='/user/profile'>Chuyen sang trang profile</a></button>
    </div>`
  );
});

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/",
    failureRedirect: "/user/login",
  })
);

router.get("/user/login", (req, res) => {
  res.send("<button><a href='/auth/google'>Login With Google</a></button>");
});

router.get("/user/logout", (req, res) => {
  req.logout();
  res.redirect("/user/login");
});

router.get("/user/profile", isAuthenticated, (req, res) => {
  const userData = req.session.passport.user;
  res.json(userData);
});

module.exports = router;
