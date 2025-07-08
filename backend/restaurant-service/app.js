require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const restaurantRoutes = require("./routes/restaurant_routes");
const errorHandler = require("./middlewares/errorhandler");

const app = express();
const PORT = process.env.PORT || 3002;

// Middlewares
app.use(bodyParser.json());

// Routes
app.use("/", restaurantRoutes);

// Error handler
app.use(errorHandler);

// Connect DB and start server
connectDB();
app.listen(PORT, () => {
    console.log(`Restaurant service running on port ${PORT}`);
});
