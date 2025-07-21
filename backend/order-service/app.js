const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const dotenv = require("dotenv");
const cors = require("cors");

const app = express();

app.use(cors());

const PORT = process.env.PORT || 3003;

const connectDB = require("./config/db.js");
const orderRoutes = require("./routes/orderRoutes.js");
const healthRoutes = require("./routes/healthRoute.js");
const ExpressError = require("./utils/ExpressError.js");

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

// Error Handling

// Handle non-existent routes (404)
app.all("*", (req, res, next) => {
  return next(new ExpressError(404, "Page Not Found!"));
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went wrong!" } = err;
  res.status(statusCode).json({
    success: false,
    error: {
      message,
      statusCode,
    },
  });
});
