const { Delivery, DeliveryAgent } = require("../models/delivery");
const axios = require("axios");

// Get all deliveries
// /deliveries
module.exports.allDeliveries = async (req, res) => {
  try {
    const deliveries = await Delivery.find();
    res.json(deliveries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get delivery by ID
// /deliveries/:id
module.exports.showDelivery = async (req, res) => {
  try {
    const delivery = await Delivery.findById(req.params.id);
    if (!delivery) return res.status(404).json({ error: "Delivery not found" });
    res.json(delivery);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create delivery
// /deliveries
module.exports.newDelivery = async (req, res) => {
  try {
    const { orderId, userId, restaurantId, deliveryAddress } = req.body;

    const delivery = new Delivery({
      orderId,
      userId,
      restaurantId,
      deliveryAddress,
      status: "PENDING",
    });

    await delivery.save();

    // // Simulate delivery after 10 minutes (10 * 60 * 1000 ms)
    // setTimeout(async () => {
    //   try {
    //     delivery.status = "DELIVERED";
    //     await delivery.save();

    //     // Update order status too
    //     await axios.patch(
    //       `${process.env.ORDER_SERVICE_URL}/orders/${orderId}/status`,
    //       { status: "DELIVERED" }
    //     );
    //   } catch (err) {
    //     console.error("Auto delivery update failed:", err.message);
    //   }
    // }, 10 * 1000); // 10 min

    // 1) driver picks up order after 60 s
    setTimeout(async () => {
      try {
        delivery.status = "PICKED_UP";
        await delivery.save();

        // order now OUT_FOR_DELIVERY
        await axios.patch(`${process.env.ORDER_SERVICE_URL}/orders/${orderId}/status`,
          { status: "OUT_FOR_DELIVERY" });
      } catch (err) {
        console.error("pickup simulation failed:", err.message);
      }
    }, 60 * 1000);

    // 2) delivered five minutes later
    setTimeout(async () => {
      try {
        delivery.status = "DELIVERED";
        await delivery.save();
        await axios.patch(`${process.env.ORDER_SERVICE_URL}/orders/${orderId}/status`,
          { status: "DELIVERED" });
      } catch (err) {
        console.error("delivery simulation failed:", err.message);
      }
    }, 6 * 60 * 1000);        // 1 min + 5 min

    res.status(201).json(delivery);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//get delivery status
// /delivery/:id/status
module.exports.getDeliveryStatus = async (req, res) => {
  try {
    const delivery = await Delivery.findById(req.params.id);

    if (!delivery) return res.status(404).json({ error: "Delivery not found" });

    res.json({ deliveryStatus: delivery.status });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update delivery status
// /deliveries/:id/status
module.exports.updateDeliveryStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const delivery = await Delivery.findById(req.params.id);

    if (!delivery) return res.status(404).json({ error: "Delivery not found" });

    delivery.status = status;

    // Update additional fields based on status
    if (status === "PICKED_UP") {
      delivery.pickupTime = new Date();

      // Update order status
      try {
        await axios.patch(
          `${ORDER_SERVICE_URL}/orders/${delivery.orderId}/status`,
          {
            status: "OUT_FOR_DELIVERY",
          }
        );
      } catch (error) {
        console.error("Failed to update order status:", error.message);
      }
    } else if (status === "DELIVERED") {
      delivery.deliveryTime = new Date();

      // Make delivery agent available again
      if (delivery.agentId) {
        await DeliveryAgent.findByIdAndUpdate(delivery.agentId, {
          isAvailable: true,
        });
      }

      // Update order status
      try {
        await axios.patch(
          `${ORDER_SERVICE_URL}/orders/${delivery.orderId}/status`,
          {
            status: "DELIVERED",
          }
        );
      } catch (error) {
        console.error("Failed to update order status:", error.message);
      }
    }

    await delivery.save();
    res.json(delivery);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get delivery by order ID
// /orders/:orderId/delivery
module.exports.deliveryByOrderId = async (req, res) => {
  try {
    const delivery = await Delivery.findOne({ orderId: req.params.orderId });
    if (!delivery) return res.status(404).json({ error: "Delivery not found" });
    res.json(delivery);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// controllers/deliveryController.js
module.exports.activeDeliveriesByUser = async (req, res) => {
  const deliveries = await Delivery.find({
    userId: req.params.userId,
    status: { $in: ["PICKED_UP", "ASSIGNED"] },   // still on the way
  });
  res.json(deliveries);
};
module.exports.activeDeliveriesMe = async (req, res) => {
  const deliveries = await Delivery.find({
    userId: req.user.id,
    status: { $in: ["PICKED_UP", "ASSIGNED"] },
  });
  res.json(deliveries);
};