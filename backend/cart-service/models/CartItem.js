const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema(
  {
    cartId: { type: String, required: true },
    menuItemId: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true, min: 1 },
    restaurantId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
// Individual items added to a cart.

module.exports = mongoose.model("CartItem", cartItemSchema);
