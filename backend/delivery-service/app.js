const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const axios = require("axios");
const connectDB = require("./config/db");
const ExpressError = require("./utils/ExpressError");

const app = express();
const PORT = process.env.PORT || 3004;

// Middleware
app.use(bodyParser.json());

// MongoDB Connection
connectDB();

app.listen(PORT, () => {
  console.log(`Delivery service running on port ${PORT}`);
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
