const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(bodyParser.json());

// MongoDB Connection
mongoose
  .connect(
    process.env.MONGODB_URI || "mongodb://restaurant_db:27017/restaurants",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connected to Restaurant Database"))
  .catch((err) => console.error("Database connection error:", err));

// Restaurant Models
const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  category: String,
  image: String,
});

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  cuisine: String,
  rating: { type: Number, default: 0 },
  operatingHours: {
    open: String,
    close: String,
  },
  menu: [menuItemSchema],
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

// API Routes
app.get("/health", (req, res) => {
  res.status(200).json({ status: "Restaurant service is healthy" });
});

// Get all restaurants
app.get("/restaurants", async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get restaurant by ID
app.get("/restaurants/:id", async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant)
      return res.status(404).json({ error: "Restaurant not found" });
    res.json(restaurant);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create restaurant
app.post("/restaurants", async (req, res) => {
  try {
    const restaurant = new Restaurant(req.body);
    await restaurant.save();
    res.status(201).json(restaurant);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update restaurant
app.put("/restaurants/:id", async (req, res) => {
  try {
    const restaurant = await Restaurant.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!restaurant)
      return res.status(404).json({ error: "Restaurant not found" });
    res.json(restaurant);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Add menu item to restaurant
app.post("/restaurants/:id/menu", async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant)
      return res.status(404).json({ error: "Restaurant not found" });

    restaurant.menu.push(req.body);
    await restaurant.save();

    res.status(201).json(restaurant);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get restaurant menu
app.get("/restaurants/:id/menu", async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant)
      return res.status(404).json({ error: "Restaurant not found" });

    res.json(restaurant.menu);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Restaurant service running on port ${PORT}`);
});
