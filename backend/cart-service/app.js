const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cartRoutes = require("./routes/cartRoutes");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use("/api/cart", cartRoutes);

app.get("/", (req, res) => {
  res.send("Cart Service API is running...");
});

module.exports = app;
