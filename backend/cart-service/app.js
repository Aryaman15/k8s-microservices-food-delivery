const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cartRoutes = require("./routes/cartRoutes");
const healthRoutes = require("./routes/healthRoute");
const cors = require("cors");

dotenv.config();
connectDB();

const app = express();
app.use(cors());

app.use(express.json());

app.use("/api/carts", cartRoutes);
app.use("/api/health", healthRoutes);

app.get("/", (req, res) => {
  res.send("Cart Service API is running...");
});

module.exports = app;
