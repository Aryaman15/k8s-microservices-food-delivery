require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const paymentRoutes = require("./routes/paymentRoutes");

const app = express();
const PORT = process.env.PORT || 3006;

app.use(bodyParser.json());
// Connect to DB
connectDB();
// Routes
app.use("/", paymentRoutes); 
// Health check
app.get("/health", (req, res) => {
  res.json({ status: "Payment service is healthy" });
});
// Start server
app.listen(PORT, () => console.log(`Payment service running on port ${PORT}`));
