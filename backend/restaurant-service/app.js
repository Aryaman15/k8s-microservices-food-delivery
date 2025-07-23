require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const restaurantRoutes = require("./routes/restaurant_routes");
const errorHandler = require("./middlewares/errorhandler");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3004;
app.use(
  cors()
  //   {
  //   // origin: "http://localhost:5173",   // front-end dev server
  //   // methods: ["GET", "POST", "PUT", "DELETE"],
  //   // allowedHeaders: ["Content-Type", "Authorization"],
  //   // credentials: true,                 // if you ever send cookies/JWT in cookies
  // }
);
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
