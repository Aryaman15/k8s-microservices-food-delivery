const express = require("express");
const router = express.Router();
const deliveryController = require("../controllers/deliveryController");

router
  .route("/deliveries")
  .get(deliveryController.allDeliveries)
  .post(deliveryController.newDelivery);

router.route("/deliveries/:id").get(deliveryController.showDelivery);

router
  .route("/deliveries/:id/status")
  .get(deliveryController.getDeliveryStatus)
  .patch(deliveryController.updateDeliveryStatus);

router
  .route("/orders/:orderId/delivery")
  .get(deliveryController.deliveryByOrderId);
module.exports = router;
