const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String, // URL or file path
    default: '',
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  // We will add OTP fields here later
  // isVerified: { type: Boolean, default: false },
  // otp: String,
  // otpExpires: Date,
}, { timestamps: true });

// Encrypt password before saving
userSchema.pre('save', async function (next) {
  try {
    // Skip if password is not modified or is undefined
    if (!this.isModified('password') || !this.password) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});



const User = mongoose.model('User', userSchema);

module.exports = User;