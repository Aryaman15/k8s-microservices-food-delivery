const Order = require("../models/order");

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

// Create order with service communication
//"/orders"
module.exports.newOrder = async (req, res) => {
  try {
    const { userId, restaurantId, items, deliveryAddress } = req.body;

    // Check if user exists
    // try {
    //   await axios.get(`${USER_SERVICE_URL}/users/${userId}`);
    // } catch (error) {
    //   return res.status(404).json({ error: "User not found" });
    // }

    // Check if restaurant exists and verify menu items
    // let restaurant;
    // try {
    //   const response = await axios.get(
    //     `${RESTAURANT_SERVICE_URL}/restaurants/${restaurantId}`
    //   );
    //   restaurant = response.data;
    // } catch (error) {
    //   return res.status(404).json({ error: "Restaurant not found" });
    // }

    // Calculate total price (in a real app, would validate against restaurant prices)
    const totalPrice = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

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

    // Notify delivery service about new order (async)
    // try {
    //   await axios.post(`${DELIVERY_SERVICE_URL}/deliveries`, {
    //     orderId: newOrder._id,
    //     restaurantId,
    //     deliveryAddress,
    //   });
    // } catch (error) {
    //   console.error("Failed to notify delivery service:", error.message);
    //   // We continue anyway, as this shouldn't block order creation
    // }

    res.status(201).json(newOrder);
  } catch (err) {
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
