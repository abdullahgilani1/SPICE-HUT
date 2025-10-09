const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  role: {
    type: String,
    enum: ['Super Admin', 'Manager', 'Staff'],
    default: 'Staff'
  },
  permissions: {
    menuManagement: {
      type: Boolean,
      default: false
    },
    orderManagement: {
      type: Boolean,
      default: true
    },
    customerManagement: {
      type: Boolean,
      default: false
    },
    adminManagement: {
      type: Boolean,
      default: false
    },
    reports: {
      type: Boolean,
      default: false
    },
    contentManagement: {
      type: Boolean,
      default: false
    }
  },
  department: {
    type: String,
    enum: ['Kitchen', 'Front Desk', 'Management', 'IT'],
    default: 'Front Desk'
  },
  shift: {
    startTime: String,
    endTime: String,
    days: [{
      type: String,
      enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    }]
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: {
    type: Date
  },
  loginCount: {
    type: Number,
    default: 0
  },
  profileImage: {
    type: String,
    trim: true
  }
}, { 
  timestamps: true 
});

// Indexes for better query performance
adminSchema.index({ email: 1 });
adminSchema.index({ user: 1 });
adminSchema.index({ role: 1 });
adminSchema.index({ isActive: 1 });

// Virtual for full name
adminSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

module.exports = mongoose.model('Admin', adminSchema);
