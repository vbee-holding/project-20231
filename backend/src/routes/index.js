const threadRouter = require("./threads");
const { saveUser, acceptNotify, getUser } = require("../controllers/UserController");

function route(app) {
  app.post("/user/profile", saveUser);
  app.get("/user/profile/:googleId", getUser);
  app.put("/user/notify/:googleId", acceptNotify);
  app.use("/threads", threadRouter);
}

module.exports = route;
