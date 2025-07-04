const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const dotenv = require("dotenv");

const app = express();
const PORT = process.env.PORT || 3003;

const connectDB = require("./config/db.js");
const orderRoutes = require("./routes/orderRoutes.js");
const healthRoutes = require("./routes/healthRoute.js");

dotenv.config();
// Middleware
app.use(bodyParser.json());

// MongoDB Connection
connectDB();

// Service endpoints
const USER_SERVICE_URL =
  process.env.USER_SERVICE_URL || "http://user-service:3001";
const RESTAURANT_SERVICE_URL =
  process.env.RESTAURANT_SERVICE_URL || "http://restaurant-service:3002";
const DELIVERY_SERVICE_URL =
  process.env.DELIVERY_SERVICE_URL || "http://delivery-service:3004";

// API Routes

app.use("/health", healthRoutes);
app.use("/", orderRoutes);

app.listen(PORT, () => {
  console.log(`Order service running on port ${PORT}`);
});
