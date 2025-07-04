const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const wrapAsync = require("../utils/wrapAsync");

router
  .route("/orders")
  .get(wrapAsync(orderController.allOrders))
  .post(wrapAsync(orderController.newOrder));
router
  .route("/orders/:id/status")
  .get(wrapAsync(orderController.getOrderStatus));
//.patch(wrapAsync(orderController.updateOrderStatus));

module.exports = router;
