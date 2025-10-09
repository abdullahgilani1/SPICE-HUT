const express = require('express');
const { 
  userSignup, 
  adminSignup, 
  login
} = require('../controllers/authController');
const { 
  validateUserSignup, 
  validateAdminSignup, 
  validateLogin 
} = require('../middleware/validation');

const router = express.Router();

router.post('/signup/user', validateUserSignup, userSignup);
router.post('/signup/admin', validateAdminSignup, adminSignup);
router.post('/login', validateLogin, login);

module.exports = router;