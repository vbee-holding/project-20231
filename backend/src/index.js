const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const route = require("./routes");
const MongoDBStore = require("connect-mongodb-session")(session);

require("dotenv").config();
const passportService = require("./services/passport");
const { PORT, MONGODB_URL_DEV, MONGODB_URL_PRODUCT, SECRET_KEY, BASE_URL } = require("./config");
const { A_WEEK } = require("./constants");
const authRoutes = require("./routes/auth");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Connect to mongodb atlas
const isDevelopment = process.env.NODE_ENV !== 'production';

let mongoDBURL;

if (isDevelopment) {
  mongoDBURL = MONGODB_URL_DEV;
} else {
  mongoDBURL = MONGODB_URL_PRODUCT;
}

mongoose
  .connect(mongoDBURL)
  .then(() => console.log(`Connected successfully to MongoDB Atlas for ${isDevelopment ? 'development' : 'production'}`))
  .catch((err) => {
    console.error(err);
    process.exit();
  });

const store = new MongoDBStore({
  uri: mongoDBURL,
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
route(app);

// app.listen(PORT, () => {
//   console.log(`Example app listening on port ${PORT}`);
// });

module.exports = app;
if (isDevelopment) {
  app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
  });
} else {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
