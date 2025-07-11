const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Payment DB connected");
  } catch (err) {
    console.error("DB connection error:", err);
    process.exit(1);
  }
};

module.exports = connectDB;
