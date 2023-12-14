const mongoose = require("mongoose");

const userSchema = mongoose.model(
  "users",
  new mongoose.Schema(
    {
      googleId: String,
      email: String,
      username: String,
      profileImgUrl: String,
    },
    {
      timestamps: true,
    }
  )
);

module.exports = userSchema;
