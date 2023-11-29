const express = require("express");
const cors = require("cors");

require("dotenv").config();
const { PORT } = require("./config");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
