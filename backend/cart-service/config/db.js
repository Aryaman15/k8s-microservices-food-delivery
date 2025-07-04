const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected to Cart DB");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectDB;