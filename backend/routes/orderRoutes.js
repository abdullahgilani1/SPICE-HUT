const express = require('express');
const router = express.Router();
const { createOrder, getOrders, getOrderById, updateOrderStatus } = require('../controllers/orderController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

// Public: create an order
router.post('/', createOrder);

// Admin-only: list orders
router.get('/', protect, adminOnly, getOrders);

// Get a single order (protected)
router.get('/:id', protect, getOrderById);

// Update status (admin only)
router.patch('/:id/status', protect, adminOnly, updateOrderStatus);

module.exports = router;
