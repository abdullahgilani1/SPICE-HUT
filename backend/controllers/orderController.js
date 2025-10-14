const Order = require('../models/Order');
const User = require('../models/User');

// Create a new order (public / from frontend)
const createOrder = async (req, res) => {
  try {
    const { customerId, customerName, items, total, paymentMethod, address } = req.body;

    if (!customerId || !items || !total) {
      return res.status(400).json({ message: 'Missing required order fields' });
    }

    // generate a simple unique orderId (can be improved)
    const orderId = `ORD-${Date.now().toString().slice(-6)}`;

    const order = await Order.create({
      orderId,
      customer: customerId,
      customerName: customerName || undefined,
      items,
      total,
      paymentMethod,
      address,
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all orders (admin only)
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('customer', 'name email phone').sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get single order by id
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('customer', 'name email phone');
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update order status (admin only)
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    order.status = status || order.status;
    await order.save();
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { createOrder, getOrders, getOrderById, updateOrderStatus };
