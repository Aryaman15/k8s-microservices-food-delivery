const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const wrapAsync = require("../utils/wrapAsync");
const authMiddleware = require("../middlewares/authMiddleware");

router
  .route("/orders")
  .get(/*authMiddleware.isAdmin,*/ wrapAsync(orderController.allOrders))
  .post(authMiddleware.protect, wrapAsync(orderController.newOrder));
router
  .route("/orders/:id/status")
  .get(/*authMiddleware.protect,*/ wrapAsync(orderController.getOrderStatus))
  .patch(
    /*authMiddleware.protect,*/ wrapAsync(orderController.updateOrderStatus)
  );

module.exports = router;
