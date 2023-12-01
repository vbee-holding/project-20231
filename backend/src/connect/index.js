const mongoose = require("mongoose");
const { MONGODB_URL } = require("../config");

const connectDb = async () => {
  try {
    await mongoose.connect(MONGODB_URL);
    console.log("Connected successfully to mongodb atlas");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDb;
