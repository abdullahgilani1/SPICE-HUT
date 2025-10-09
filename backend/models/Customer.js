const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true,
    enum: ['Home', 'Work', 'Other'],
    default: 'Home'
  },
  street: {
    type: String,
    required: true,
    trim: true
  },
  city: {
    type: String,
    required: true,
    trim: true
  },
  state: {
    type: String,
    required: true,
    trim: true
  },
  zipCode: {
    type: String,
    required: true,
    trim: true
  },
  country: {
    type: String,
    default: 'Canada',
    trim: true
  },
  isDefault: {
    type: Boolean,
    default: false
  },
  instructions: {
    type: String,
    trim: true,
    maxlength: 200
  }
});

const customerSchema = new mongoose.Schema({
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
  addresses: [addressSchema],
  dateOfBirth: {
    type: Date
  },
  preferences: {
    dietaryRestrictions: [{
      type: String,
      enum: ['Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Nut-Free', 'Spicy', 'Mild']
    }],
    favoriteCategories: [{
      type: String
    }],
    spiceLevel: {
      type: String,
      enum: ['Mild', 'Medium', 'Hot'],
      default: 'Medium'
    }
  },
  loyaltyPoints: {
    type: Number,
    default: 0
  },
  totalOrders: {
    type: Number,
    default: 0
  },
  totalSpent: {
    type: Number,
    default: 0
  },
  lastOrderDate: {
    type: Date
  },
  isActive: {
    type: Boolean,
    default: true
  },
  marketingConsent: {
    type: Boolean,
    default: false
  }
}, { 
  timestamps: true 
});

// Indexes for better query performance
customerSchema.index({ email: 1 });
customerSchema.index({ user: 1 });
customerSchema.index({ loyaltyPoints: -1 });

// Virtual for full name
customerSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Ensure only one default address
customerSchema.pre('save', function(next) {
  if (this.addresses && this.addresses.length > 0) {
    const defaultAddresses = this.addresses.filter(addr => addr.isDefault);
    if (defaultAddresses.length > 1) {
      // Keep only the first default address
      this.addresses.forEach((addr, index) => {
        if (index > 0 && addr.isDefault) {
          addr.isDefault = false;
        }
      });
    }
  }
  next();
});

module.exports = mongoose.model('Customer', customerSchema);
