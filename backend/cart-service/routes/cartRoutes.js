const { protect } = require("../middlewares/authMiddleware");

const express = require("express");
const router = express.Router();
const {
  createCart,
  getCartsByUser,
  //updateCart,
  addItemToCart,
  updateCartItem,
  deleteCartItem,
  getCartItems,
} = require("../controllers/cartController");

router.post("/", protect, createCart);
router.get("/user/:userId", protect, getCartsByUser);
// router.patch("/:cartId", updateCart);

// Nested item routes
router.post("/:cartId/items", protect, addItemToCart);
router.get("/:cartId/items", protect, getCartItems);
router.put("/items/:itemId", protect, updateCartItem);
router.delete("/items/:itemId", protect, deleteCartItem);

module.exports = router;
