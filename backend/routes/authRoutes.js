const express = require('express');
const { registerUser, loginUser, verifyUser, resetPassword } = require('../controllers/authController');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/verify-user', verifyUser);
router.post('/reset-password', resetPassword);

module.exports = router;