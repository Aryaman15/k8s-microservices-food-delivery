const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema(
  {
    cartId: { type: String, required: true },
    menuItemId: { type: String, required: true },
    name: { type: String, required: true }, // <-- add
    price: { type: Number, required: true }, // <-- add
    quantity: { type: Number, required: true, min: 1 },
  },
  { timestamps: true }
);
// Individual items added to a cart.

module.exports = mongoose.model("CartItem", cartItemSchema);
