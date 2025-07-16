const { protect } = require("../middlewares/authMiddleware");
const express = require("express");
const router = express.Router();
const {
  getCartsByUser,
  getCartForRestaurant,
  addItemToCart,
  getCartItems,
  updateCartItem,
  deleteCartItem,
  updateCart,
} = require("../controllers/cartController");

// List all carts for a user
router.get("/user/:userId", protect, getCartsByUser);

// Get (or 404) the single cart for a user+restaurant
router.get(
  "/user/:userId/restaurant/:restaurantId",
  protect,
  getCartForRestaurant
);

// Add an item (server will create the one-or-none cart behind-the-scenes)
router.post("/items", protect, addItemToCart);

// Get items within a cart
router.get("/:cartId/items", protect, getCartItems);

router.put("/:cartId/items/:menuItemId", protect, updateCartItem);
router.delete("/:cartId/items/:menuItemId", protect, deleteCartItem);

// Patch cart (e.g. status)
router.patch("/:cartId", protect, updateCart);

module.exports = router;
