const Payment = require("../models/payment");

exports.makePayment = async (req, res) => {
  try {
    const { orderId, amount } = req.body;
    const status =  "Success";
    const payment = new Payment({
      orderId,
      amount,
      status
    });

    await payment.save();

    res.status(201).json({
      message: "Payment processed",
      payment
    });

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all transactions (for logs)
exports.getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find();
    res.json(payments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
