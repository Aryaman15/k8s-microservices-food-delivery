const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  cartId: {
    type: String,
    required: true
  },
  menuItemId: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  }
});
// Individual items added to a cart.


module.exports = mongoose.model("CartItem", cartItemSchema);    