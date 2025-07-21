const Cart = require("../models/Cart");
const CartItem = require("../models/CartItem");

// Get ALL active carts for a user (one per restaurant)
const getCartsByUser = async (req, res) => {
  try {
    const carts = await Cart.find({
      userId: req.params.userId,
      status: "ACTIVE",
    });
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
    //console.log(cart);
    if (!cart) {
      //console.log("hit!");
      return res.status(404).json({ message: "No cart" });
    }
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
    let item = await CartItem.findOne({
      cartId: cart._id.toString(),
      menuItemId,
    });
    if (!item) {
      item = await CartItem.create({
        cartId: cart._id.toString(),
        menuItemId,
        restaurantId,
        name,
        price,
        quantity,
      });
    } else {
      item = await CartItem.findOneAndUpdate(
        { cartId: cart._id.toString(), menuItemId },
        { quantity },
        { new: true }
      );
    }
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
  const { cartId, menuItemId } = req.params;
  const { quantity } = req.body;
  try {
    const item = await CartItem.findOneAndUpdate(
      { cartId, menuItemId },
      { quantity },
      { new: true }
    );
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Remove an item — and if it was the last, delete its cart
const deleteCartItem = async (req, res) => {
  const { cartId, menuItemId } = req.params;
  try {
    const item = await CartItem.findOneAndDelete({ cartId, menuItemId });
    if (!item) return res.status(404).json({ message: "Item not found" });

    // Check if cart is now empty
    const remaining = await CartItem.countDocuments({ cartId });
    if (remaining === 0) {
      await Cart.findByIdAndDelete(cartId);
    }

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
    if (!cart) return res.status(404).json({ message: "Cart not found" });
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
