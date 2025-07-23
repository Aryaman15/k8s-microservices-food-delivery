const Order = require("../models/order");
const axios = require("axios");
const { getTotalPrice } = require("../utils/getTotalPrice");

// Get all orders
//"/orders"
module.exports.allOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get order by ID
//"/orders/:id"
module.exports.showOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get orders by user
//"/users/:userId/orders"
module.exports.showUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//create new order
//"/orders"
module.exports.newOrder = async (req, res) => {
  try {
    const { restaurantId, items, deliveryAddress } = req.body;
    const userId = req.user.id;

    // Fetch menu & calculate total
    // const { data: restaurantMenu } = await axios.get(
    //   `${process.env.RESTAURANT_SERVICE_URL}/restaurants/${restaurantId}/menu`
    // );

    let totalPrice = getTotalPrice(items);

    // Create order
    const newOrder = new Order({
      userId,
      restaurantId,
      items,
      totalPrice,
      deliveryAddress,
      status: "PLACED",
    });

    await newOrder.save();

    // Notify delivery service
    if (process.env.DELIVERY_SERVICE_URL) {
      try {
        await axios.post(`${process.env.DELIVERY_SERVICE_URL}/deliveries`, {
          orderId: newOrder._id,
          userId,
          restaurantId,
          deliveryAddress,
        });
      } catch (err) {
        console.error("Delivery service notification failed:", err.message);
        // we still return success, but might log to monitoring system
      }
    }

    res.status(201).json(newOrder);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

//Get order status
//"/orders/:id/status"
module.exports.getOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ error: "order not found!" });
    res.json({ orderStatus: order.status });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update order status
//"/orders/:id/status"
module.exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!order) return res.status(404).json({ error: "Order not found" });

    res.json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


module.exports.myOrders = async (req, res) => {
  try {
    const orders = await Order
      .find({ userId: req.user.id })
      .sort({ createdAt: -1 });      // newest first
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};