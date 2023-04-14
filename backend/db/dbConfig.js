const mongoose = require("mongoose");

const connectToDb = async () => {
  const mongodbUri = process.env.MONGODB_URI;
  try {
    const connect = mongoose.connect(mongodbUri);
    console.log("database connected...");
  } catch (error) {
    console.log("db connection error");
    process.exit(1);
  }
};

module.exports = connectToDb;
