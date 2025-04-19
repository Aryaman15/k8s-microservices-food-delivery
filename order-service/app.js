const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3003;

// Middleware
app.use(bodyParser.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://order_db:27017/orders", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to Order Database"))
  .catch((err) => console.error("Database connection error:", err));

// Order Model
const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  restaurantId: { type: String, required: true },
  items: [
    {
      menuItemId: String,
      name: String,
      price: Number,
      quantity: Number,
    },
  ],
  totalPrice: { type: Number, required: true },
  status: {
    type: String,
    enum: [
      "PLACED",
      "CONFIRMED",
      "PREPARING",
      "OUT_FOR_DELIVERY",
      "DELIVERED",
      "CANCELLED",
    ],
    default: "PLACED",
  },
  deliveryAddress: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", orderSchema);

// Service endpoints
const USER_SERVICE_URL =
  process.env.USER_SERVICE_URL || "http://user-service:3001";
const RESTAURANT_SERVICE_URL =
  process.env.RESTAURANT_SERVICE_URL || "http://restaurant-service:3002";
const DELIVERY_SERVICE_URL =
  process.env.DELIVERY_SERVICE_URL || "http://delivery-service:3004";

// API Routes
app.get("/health", (req, res) => {
  res.status(200).json({ status: "Order service is healthy" });
});

// Get all orders
app.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get order by ID
app.get("/orders/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get orders by user
app.get("/users/:userId/orders", async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create order with service communication
app.post("/orders", async (req, res) => {
  try {
    const { userId, restaurantId, items, deliveryAddress } = req.body;

    // Check if user exists
    try {
      await axios.get(`${USER_SERVICE_URL}/users/${userId}`);
    } catch (error) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if restaurant exists and verify menu items
    let restaurant;
    try {
      const response = await axios.get(
        `${RESTAURANT_SERVICE_URL}/restaurants/${restaurantId}`
      );
      restaurant = response.data;
    } catch (error) {
      return res.status(404).json({ error: "Restaurant not found" });
    }

    // Calculate total price (in a real app, would validate against restaurant prices)
    const totalPrice = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    // Create order
    const newOrder = new Order({
      userId,
      restaurantId,
      items,
      totalPrice,
      deliveryAddress,
      status: "PLACED",
    });

    await newOrder.save();

    // Notify delivery service about new order (async)
    try {
      await axios.post(`${DELIVERY_SERVICE_URL}/deliveries`, {
        orderId: newOrder._id,
        restaurantId,
        deliveryAddress,
      });
    } catch (error) {
      console.error("Failed to notify delivery service:", error.message);
      // We continue anyway, as this shouldn't block order creation
    }

    res.status(201).json(newOrder);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update order status
app.patch("/orders/:id/status", async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!order) return res.status(404).json({ error: "Order not found" });

    res.json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Order service running on port ${PORT}`);
});
