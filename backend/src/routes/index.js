const threadRouter = require("./threads");
const saveUser = require("../controllers/UserController");

function route(app) {
  app.post("/user/profile", saveUser);
  app.use("/threads", threadRouter);
}

module.exports = route;
