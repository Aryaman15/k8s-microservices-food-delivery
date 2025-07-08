const express = require("express");
const router = express.Router();
const paymentController = require("../controller/paymentController");

router.post("/pay", paymentController.makePayment);
router.get("/transactions", paymentController.getAllPayments);

module.exports = router;
