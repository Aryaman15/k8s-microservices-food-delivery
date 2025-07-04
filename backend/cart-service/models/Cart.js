const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  restaurantId: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ["ACTIVE", "PAID", "CANCELLED"],
    default: "ACTIVE"
  }
}, { timestamps: true });

module.exports = mongoose.model("Cart", cartSchema);

// One cart per user per restaurant,