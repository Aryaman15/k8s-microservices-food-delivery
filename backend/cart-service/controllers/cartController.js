const Cart = require("../models/Cart");
const CartItem = require("../models/CartItem");

const createCart = async (req, res) => {
  try {
    const cart = await Cart.create(req.body);
    res.status(201).json(cart);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getCartsByUser = async (req, res) => {
  try {
    const cart = await Cart.find({
      userId: req.params.userId,
      status: "ACTIVE",
    });
    console.log(cart);
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateCartStatus = async (req, res) => {
  try {
    const cart = await Cart.findByIdAndUpdate(
      req.params.cartId,
      { status: req.body.status },
      { new: true }
    );
    res.json(cart);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const addItemToCart = async (req, res) => {
  try {
    const item = await CartItem.create(req.body);
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const updateCartItem = async (req, res) => {
  try {
    const item = await CartItem.findByIdAndUpdate(req.params.itemId, req.body, {
      new: true,
    });
    res.json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteCartItem = async (req, res) => {
  try {
    await CartItem.findByIdAndDelete(req.params.itemId);
    res.json({ message: "Item deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getCartItems = async (req, res) => {
  try {
    const items = await CartItem.find({ cartId: req.params.cartId });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createCart,
  getCartsByUser,
  updateCartStatus,
  addItemToCart,
  updateCartItem,
  deleteCartItem,
  getCartItems,
};
