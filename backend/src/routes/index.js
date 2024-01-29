const threadRouter = require("./threads");
const hotRouter = require("./hot");
const { saveUser, acceptNotify, getUser } = require("../controllers/UserController");

function route(app) {
  app.post("/user/profile", saveUser);
  app.get("/user/profile/:googleId", getUser);
  app.put("/user/notify/:googleId", acceptNotify);
  app.use("/threads", threadRouter);
  app.use("/trending", hotRouter);
}

module.exports = route;
