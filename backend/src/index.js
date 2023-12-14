const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const MongoDBStore = require("connect-mongodb-session")(session);

require("dotenv").config();
const passportService = require("./services/passport");
const { PORT, MONGODB_URL, SECRET_KEY } = require("./config");
const { A_WEEK } = require("./constants");
const authRoutes = require("./routes/auth");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Connect to mongodb atlas
mongoose
  .connect(MONGODB_URL)
  .then(() => console.log("Connected successfully to mongodb atlas"))
  .catch((err) => {
    console.error(err);
    process.exit();
  });

const store = new MongoDBStore({
  uri: MONGODB_URL,
  collection: "sessions",
});

app.use(
  session({
    secret: SECRET_KEY,
    cookie: {
      maxAge: A_WEEK,
      secure: false,
      httpOnly: true,
    },
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.use(passport.initialize());
app.use(passport.session());
passportService(passport);

app.use(authRoutes);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
