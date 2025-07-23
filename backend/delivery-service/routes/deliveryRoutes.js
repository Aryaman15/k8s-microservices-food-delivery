const express = require("express");
const router = express.Router();
const deliveryController = require("../controllers/deliveryController");
const wrapAsync = require("../utils/wrapAsync");
const { protect } = require("../middlewares/authMiddleware");

router
  .route("/deliveries")
  .get(wrapAsync(deliveryController.allDeliveries))
  .post(wrapAsync(deliveryController.newDelivery));

router.route("/deliveries/:id").get(wrapAsync(deliveryController.showDelivery));

router
  .route("/deliveries/:id/status")
  .get(wrapAsync(deliveryController.getDeliveryStatus))
  .patch(wrapAsync(deliveryController.updateDeliveryStatus));

router
  .route("/orders/:orderId/delivery")
  .get(wrapAsync(deliveryController.deliveryByOrderId));
// router.get("/user/:userId/active", wrapAsync(deliveryController.activeDeliveriesByUser));

// router.get(
//   "/deliveries/user/me/active",
//   .get)wrapAsync(deliveryController.activeDeliveriesMe)
// );
router
  .route("/deliveries/user/me/active")
  .get(protect, wrapAsync(deliveryController.activeDeliveriesMe));
module.exports = router;
