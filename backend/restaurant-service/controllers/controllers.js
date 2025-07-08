const Restaurant = require("../Models/restaurant");
const Menu = require("../Models/MenuItem");
// Health check
exports.healthCheck = (req, res) => {
  res.status(200).json({ status: "Restaurant service is healthy" });
};

// Get all restaurants
exports.getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get restaurant by ID
exports.getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) return res.status(404).json({ error: "Restaurant not found" });
    res.json(restaurant);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Create restaurant
exports.createRestaurant = async (req, res) => {
  try {
    const restaurant = new Restaurant(req.body);
    await restaurant.save();
    res.status(201).json(restaurant);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update restaurant
exports.updateRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!restaurant) return res.status(404).json({ error: "Restaurant not found" });
    res.json(restaurant);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
exports.addMenu = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant)
      return res.status(404).json({ error: "Restaurant not found" });
    if (restaurant.menu)
      return res.status(400).json({ error: "Restaurant already has a menu" });
    const newMenu = new Menu(req.body);
    await newMenu.save();
    restaurant.menu = newMenu._id;
    await restaurant.save();
    res.status(201).json({
      message: "Menu added successfully to restaurant",
      menu: newMenu,
      restaurant
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getMenu = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id).populate("menu");
    if (!restaurant)
      return res.status(404).json({ error: "Restaurant not found" });
    if (!restaurant.menu)
      return res.status(404).json({ error: "No menu assigned to this restaurant" });
    res.json(restaurant.menu);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

