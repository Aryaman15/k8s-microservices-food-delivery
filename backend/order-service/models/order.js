const mongoose = require("mongoose");
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
  totalPice: { type: Number, required: true },
  status: {
    type: String,
    enum: ["PLACED", "CONFIRMED", "OUT_FOR_DELIVERY", "DELIVERED", "CANCELLED"],
    default: "PLACED",
  },
  deliveryAddress: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
