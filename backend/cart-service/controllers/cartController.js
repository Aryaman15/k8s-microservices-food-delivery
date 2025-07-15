const Cart = require("../models/Cart");
const CartItem = require("../models/CartItem");

// Get ALL active carts for a user (one per restaurant)
const getCartsByUser = async (req, res) => {
  try {
    const carts = await Cart.find({
      userId: req.params.userId,
      status: "ACTIVE",
    });
    //console.log(carts);
    res.json(carts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get the single active cart for this user+restaurant (or 404)
const getCartForRestaurant = async (req, res) => {
  const { userId, restaurantId } = req.params;
  try {
    const cart = await Cart.findOne({ userId, restaurantId, status: "ACTIVE" });
    if (!cart) return res.status(404).json({ message: "No cart" });
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add item to the single cart (create if needed)
const addItemToCart = async (req, res) => {
  const { userId, restaurantId, menuItemId, name, price, quantity } = req.body;
  try {
    let cart = await Cart.findOne({ userId, restaurantId, status: "ACTIVE" });
    if (!cart) {
      cart = await Cart.create({ userId, restaurantId });
    }

    const item = await CartItem.create({
      cartId: cart._id.toString(),
      menuItemId,
      name, // save name
      price, // save price
      quantity,
    });

    res.status(201).json({ cart, item });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all items in a cart
const getCartItems = async (req, res) => {
  try {
    const items = await CartItem.find({ cartId: req.params.cartId });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a cart-item’s quantity
const updateCartItem = async (req, res) => {
  try {
    const item = await CartItem.findByIdAndUpdate(
      req.params.itemId,
      { quantity: req.body.quantity },
      { new: true }
    );
    res.json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Remove an item — and if it was the last, delete its cart
const deleteCartItem = async (req, res) => {
  try {
    const item = await CartItem.findById(req.params.itemId);
    if (!item) return res.status(404).json({ message: "Item not found" });
    await item.remove();
    const remaining = await CartItem.countDocuments({ cartId: item.cartId });
    if (remaining === 0) await Cart.findByIdAndDelete(item.cartId);
    res.json({ message: "Deleted", cartRemoved: remaining === 0 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Patch any cart fields (e.g. status=“PAID”)
const updateCart = async (req, res) => {
  try {
    const cart = await Cart.findByIdAndUpdate(req.params.cartId, req.body, {
      new: true,
    });
    res.json(cart);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  getCartsByUser,
  getCartForRestaurant,
  addItemToCart,
  getCartItems,
  updateCartItem,
  deleteCartItem,
  updateCart,
};
