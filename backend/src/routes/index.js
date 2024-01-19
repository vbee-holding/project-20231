const threadRouter = require("./threads");
const { saveUser, acceptNotify } = require("../controllers/UserController");

function route(app) {
  app.post("/user/profile", saveUser);
  app.put("/user/notify/:googleId", acceptNotify);
  app.use("/threads", threadRouter);
}

module.exports = route;
