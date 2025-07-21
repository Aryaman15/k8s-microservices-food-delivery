const mongoose = require("mongoose");

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
  userId: { type: String, required: true },
  pickupTime: Date,
  deliveryTime: Date,
  createdAt: { type: Date, default: Date.now },
});

module.exports.Delivery = mongoose.model("Delivery", deliverySchema);
module.exports.DeliveryAgent = mongoose.model(
  "DeliveryAgent",
  deliveryAgentSchema
);
