const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI);
    console.log("db connected");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDB;
