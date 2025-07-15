const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const cors = require("cors");

dotenv.config();
connectDB();

const app = express();
app.use(cors());

app.use(express.json());

app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("User Service API is running...");
});

module.exports = app;
