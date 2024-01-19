const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const route = require("./routes");

require("dotenv").config();
const { PORT, MONGODB_URL_DEV, MONGODB_URL_PRODUCT } = require("./config");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Connect to mongodb atlas
const isDevelopment = process.env.NODE_ENV !== "production";

let mongoDBURL;

if (isDevelopment) {
  mongoDBURL = MONGODB_URL_DEV;
} else {
  mongoDBURL = MONGODB_URL_PRODUCT;
}

mongoose
  .connect(mongoDBURL)
  .then(() =>
    console.log(
      `Connected successfully to MongoDB Atlas for ${
        isDevelopment ? "development" : "production"
      }`
    )
  )
  .catch((err) => {
    console.error(err);
    process.exit();
  });

route(app);

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
