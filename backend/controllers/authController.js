const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Helper function to generate JWT
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

/**
 * @desc    Register a new user or admin
 * @route   POST /api/auth/register
 * @access  Public
 */
const registerUser = async (req, res) => {
  const { name, email, password, phone, role } = req.body;

  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const user = await User.create({
      name,
      email,
      password,
      phone,
      role: role || 'user', // Default to 'user' if role is not provided
    });

    if (user) {
      // We will add OTP logic here later. For now, we'll just register.
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id, user.role),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * @desc    Authenticate user & get token
 * @route   POST /api/auth/login
 * @access  Public
 */
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  // Minimal logging: avoid printing passwords, full user objects, emails or IDs
  console.log('Auth: login attempt');

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    console.log(`Auth: user lookup ${user ? 'found' : 'not found'}`);

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check if password matches (do not log the boolean in production if you prefer silence)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Auth: failed login attempt');
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    console.log('Auth: successful login');

    // User is authenticated, return token
    res.status(200).json({
      token: generateToken(user._id, user.role),
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


/**
 * @desc    Verify user for password reset
 * @route   POST /api/auth/verify-user
 * @access  Public
 */
const verifyUser = async (req, res) => {
  const { email, phone } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.phone !== phone) {
      return res.status(400).json({ message: 'Phone number does not match' });
    }

    res.status(200).json({ message: 'User verified successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * @desc    Reset user password
 * @route   POST /api/auth/reset-password
 * @access  Public
 */
const resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.password = newPassword; // plain text
    await user.save();

    res.json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    console.error("Reset password error:", error); // 👈 ADD THIS LINE
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



module.exports = {
  registerUser,
  loginUser,
  verifyUser,
  resetPassword,
};