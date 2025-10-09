const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, Customer, Admin } = require('../models');

// Generate JWT token
const generateToken = (userId, role) => {
  return jwt.sign(
    { userId, role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

// User Signup
const userSignup = async (req, res) => {
  try {
    const { username, email, password, firstName, lastName, phone } = req.body;

    // Validation
    if (!username || !email || !password || !firstName || !lastName) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long'
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User with this email or username already exists'
      });
    }

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user
    const user = new User({
      username,
      email,
      password: hashedPassword,
      role: 'user',
      firstName,
      lastName,
      phone
    });

    await user.save();

    // Create customer profile
    const customer = new Customer({
      user: user._id,
      firstName,
      lastName,
      email,
      phone,
      addresses: [],
      preferences: {
        dietaryRestrictions: [],
        favoriteCategories: [],
        spiceLevel: 'Medium'
      },
      loyaltyPoints: 0,
      totalOrders: 0,
      totalSpent: 0
    });

    await customer.save();

    // Generate token
    const token = generateToken(user._id, user.role);

    // Return user data (without password)
    const userData = {
      id: user._id,
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      role: user.role,
      isActive: user.isActive
    };

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: userData,
        token
      }
    });

  } catch (error) {
    console.error('User signup error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during registration',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Admin Signup
const adminSignup = async (req, res) => {
  try {
    const { username, email, password, firstName, lastName, phone, adminRole, department } = req.body;

    // Validation
    if (!username || !email || !password || !firstName || !lastName) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long'
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User with this email or username already exists'
      });
    }

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user
    const user = new User({
      username,
      email,
      password: hashedPassword,
      role: 'admin',
      firstName,
      lastName,
      phone
    });

    await user.save();

    // Create admin profile
    const admin = new Admin({
      user: user._id,
      firstName,
      lastName,
      email,
      phone,
      role: adminRole || 'Staff',
      permissions: {
        menuManagement: adminRole === 'Super Admin' || adminRole === 'Manager',
        orderManagement: true,
        customerManagement: adminRole === 'Super Admin' || adminRole === 'Manager',
        adminManagement: adminRole === 'Super Admin',
        reports: adminRole === 'Super Admin' || adminRole === 'Manager',
        contentManagement: adminRole === 'Super Admin' || adminRole === 'Manager'
      },
      department: department || 'Front Desk',
      isActive: true
    });

    await admin.save();

    // Generate token
    const token = generateToken(user._id, user.role);

    // Return user data (without password)
    const userData = {
      id: user._id,
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      role: user.role,
      isActive: user.isActive,
      adminProfile: {
        adminRole: admin.role,
        department: admin.department,
        permissions: admin.permissions
      }
    };

    res.status(201).json({
      success: true,
      message: 'Admin registered successfully',
      data: {
        user: userData,
        token
      }
    });

  } catch (error) {
    console.error('Admin signup error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during admin registration',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Login (for both user and admin)
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      });
    }

    // Find user with password
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Check if user is active
    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Account is deactivated. Please contact support.'
      });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate token
    const token = generateToken(user._id, user.role);

    // Get additional profile data based on role
    let profileData = {};
    if (user.role === 'user') {
      const customer = await Customer.findOne({ user: user._id });
      profileData = {
        loyaltyPoints: customer?.loyaltyPoints || 0,
        totalOrders: customer?.totalOrders || 0,
        totalSpent: customer?.totalSpent || 0,
        addresses: customer?.addresses || []
      };
    } else if (user.role === 'admin') {
      const admin = await Admin.findOne({ user: user._id });
      profileData = {
        adminRole: admin?.role,
        department: admin?.department,
        permissions: admin?.permissions
      };
    }

    // Return user data (without password)
    const userData = {
      id: user._id,
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      role: user.role,
      isActive: user.isActive,
      lastLogin: user.lastLogin,
      ...profileData
    };

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        user: userData,
        token
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Get current user profile
const getProfile = async (req, res) => {
  try {
    const user = req.user;

    // Get additional profile data based on role
    let profileData = {};
    if (user.role === 'user') {
      const customer = await Customer.findOne({ user: user._id });
      profileData = {
        loyaltyPoints: customer?.loyaltyPoints || 0,
        totalOrders: customer?.totalOrders || 0,
        totalSpent: customer?.totalSpent || 0,
        addresses: customer?.addresses || [],
        preferences: customer?.preferences || {}
      };
    } else if (user.role === 'admin') {
      const admin = await Admin.findOne({ user: user._id });
      profileData = {
        adminRole: admin?.role,
        department: admin?.department,
        permissions: admin?.permissions
      };
    }

    const userData = {
      id: user._id,
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      role: user.role,
      isActive: user.isActive,
      lastLogin: user.lastLogin,
      ...profileData
    };

    res.status(200).json({
      success: true,
      data: { user: userData }
    });

  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching profile',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Logout (client-side token removal, but we can track it)
const logout = async (req, res) => {
  try {
    // In a more advanced setup, you could maintain a blacklist of tokens
    // For now, we'll just return success as token removal is handled client-side
    res.status(200).json({
      success: true,
      message: 'Logout successful'
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during logout'
    });
  }
};

module.exports = {
  userSignup,
  adminSignup,
  login,
  getProfile,
  logout
};
