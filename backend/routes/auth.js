const express = require('express');
const { 
  userSignup, 
  adminSignup, 
  login, 
  getProfile, 
  logout 
} = require('../controllers/authController');
const { authenticateToken } = require('../middleware/auth');
const { 
  validateUserSignup, 
  validateAdminSignup, 
  validateLogin 
} = require('../middleware/validation');

const router = express.Router();

// Public routes
router.post('/signup/user', validateUserSignup, userSignup);
router.post('/signup/admin', validateAdminSignup, adminSignup);
router.post('/login', validateLogin, login);

// Protected routes
router.get('/profile', authenticateToken, getProfile);
router.post('/logout', authenticateToken, logout);

// Legacy route for backward compatibility
router.post('/register', (req, res) => {
  res.status(400).json({
    success: false,
    message: 'Please use /signup/user or /signup/admin endpoints'
  });
});

module.exports = router;