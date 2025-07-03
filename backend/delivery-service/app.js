const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3004;

// Middleware
app.use(bodyParser.json());

// MongoDB Connection
mongoose
  .connect(
    process.env.MONGODB_URI || "mongodb://delivery_db:27017/deliveries",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connected to Delivery Database"))
  .catch((err) => console.error("Database connection error:", err));

// Delivery Models
const deliveryAgentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: String,
  isAvailable: { type: Boolean, default: true },
  currentLocation: {
    lat: Number,
    lng: Number,
  },
});

const DeliveryAgent = mongoose.model("DeliveryAgent", deliveryAgentSchema);

const deliverySchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  restaurantId: { type: String, required: true },
  agentId: { type: String },
  status: {
    type: String,
    enum: ["PENDING", "ASSIGNED", "PICKED_UP", "DELIVERED", "FAILED"],
    default: "PENDING",
  },
  deliveryAddress: { type: String, required: true },
  pickupTime: Date,
  deliveryTime: Date,
  createdAt: { type: Date, default: Date.now },
});

const Delivery = mongoose.model("Delivery", deliverySchema);

// Service endpoint
const ORDER_SERVICE_URL =
  process.env.ORDER_SERVICE_URL || "http://order-service:3003";

// API Routes
app.get("/health", (req, res) => {
  res.status(200).json({ status: "Delivery service is healthy" });
});

// Get all deliveries
app.get("/deliveries", async (req, res) => {
  try {
    const deliveries = await Delivery.find();
    res.json(deliveries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get delivery by ID
app.get("/deliveries/:id", async (req, res) => {
  try {
    const delivery = await Delivery.findById(req.params.id);
    if (!delivery) return res.status(404).json({ error: "Delivery not found" });
    res.json(delivery);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get delivery by order ID
app.get("/orders/:orderId/delivery", async (req, res) => {
  try {
    const delivery = await Delivery.findOne({ orderId: req.params.orderId });
    if (!delivery) return res.status(404).json({ error: "Delivery not found" });
    res.json(delivery);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create delivery
app.post("/deliveries", async (req, res) => {
  try {
    const { orderId, restaurantId, deliveryAddress } = req.body;

    // Check if delivery already exists for this order
    const existingDelivery = await Delivery.findOne({ orderId });
    if (existingDelivery) {
      return res.status(409).json({
        error: "Delivery already exists for this order",
        delivery: existingDelivery,
      });
    }

    // Create new delivery
    const delivery = new Delivery({
      orderId,
      restaurantId,
      deliveryAddress,
      status: "PENDING",
    });

    await delivery.save();

    // Find available delivery agent (in a real system, would have more complex logic)
    const agent = await DeliveryAgent.findOne({ isAvailable: true });

    if (agent) {
      // Assign delivery to agent
      delivery.agentId = agent._id;
      delivery.status = "ASSIGNED";

      // Update agent availability
      agent.isAvailable = false;
      await agent.save();

      // Update order status
      try {
        await axios.patch(`${ORDER_SERVICE_URL}/orders/${orderId}/status`, {
          status: "CONFIRMED",
        });
      } catch (error) {
        console.error("Failed to update order status:", error.message);
      }
    }

    await delivery.save();
    res.status(201).json(delivery);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update delivery status
app.patch("/deliveries/:id/status", async (req, res) => {
  try {
    const { status } = req.body;
    const delivery = await Delivery.findById(req.params.id);

    if (!delivery) return res.status(404).json({ error: "Delivery not found" });

    delivery.status = status;

    // Update additional fields based on status
    if (status === "PICKED_UP") {
      delivery.pickupTime = new Date();

      // Update order status
      try {
        await axios.patch(
          `${ORDER_SERVICE_URL}/orders/${delivery.orderId}/status`,
          {
            status: "OUT_FOR_DELIVERY",
          }
        );
      } catch (error) {
        console.error("Failed to update order status:", error.message);
      }
    } else if (status === "DELIVERED") {
      delivery.deliveryTime = new Date();

      // Make delivery agent available again
      if (delivery.agentId) {
        await DeliveryAgent.findByIdAndUpdate(delivery.agentId, {
          isAvailable: true,
        });
      }

      // Update order status
      try {
        await axios.patch(
          `${ORDER_SERVICE_URL}/orders/${delivery.orderId}/status`,
          {
            status: "DELIVERED",
          }
        );
      } catch (error) {
        console.error("Failed to update order status:", error.message);
      }
    }

    await delivery.save();
    res.json(delivery);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Create delivery agent
app.post("/agents", async (req, res) => {
  try {
    const agent = new DeliveryAgent(req.body);
    await agent.save();
    res.status(201).json(agent);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all delivery agents
app.get("/agents", async (req, res) => {
  try {
    const agents = await DeliveryAgent.find();
    res.json(agents);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Delivery service running on port ${PORT}`);
});
