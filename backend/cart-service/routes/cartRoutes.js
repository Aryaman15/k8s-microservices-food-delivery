const express = require("express");
const router = express.Router();
const {
  createCart,
  getCartByUser,
  updateCartStatus,
  addItemToCart,
  updateCartItem,
  deleteCartItem,
  getCartItems
} = require("../controllers/cartController");

router.post("/", createCart);
router.get("/user/:userId", getCartByUser);
router.patch("/:cartId/status", updateCartStatus);

router.post("/items", addItemToCart);
router.get("/items/:cartId", getCartItems);
router.put("/items/:itemId", updateCartItem);
router.delete("/items/:itemId", deleteCartItem);

module.exports = router;