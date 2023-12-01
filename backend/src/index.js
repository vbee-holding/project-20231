const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();
const { PORT, MONGODB_URL } = require("./config");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Connect to mongodb
mongoose
  .connect(MONGODB_URL)
  .then(() => console.log("Connected successfully to mongodb atlas"))
  .catch((err) => {
    console.error(err);
    process.exit();
  });

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
