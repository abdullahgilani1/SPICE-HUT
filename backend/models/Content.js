const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  page: {
    type: String,
    required: true,
    enum: ['About', 'Contact', 'Privacy Policy', 'Terms of Service', 'Refund Policy', 'Home'],
    unique: true
  },
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  content: {
    type: String,
    required: true
  },
  metaDescription: {
    type: String,
    trim: true,
    maxlength: 160
  },
  metaKeywords: [{
    type: String,
    trim: true
  }],
  images: [{
    url: String,
    alt: String,
    caption: String
  }],
  contactInfo: {
    address: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: {
        type: String,
        default: 'Canada'
      }
    },
    phone: String,
    email: String,
    hours: {
      monday: String,
      tuesday: String,
      wednesday: String,
      thursday: String,
      friday: String,
      saturday: String,
      sunday: String
    },
    socialMedia: {
      facebook: String,
      instagram: String,
      twitter: String,
      linkedin: String
    }
  },
  isPublished: {
    type: Boolean,
    default: true
  },
  lastModifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin'
  },
  version: {
    type: Number,
    default: 1
  }
}, { 
  timestamps: true 
});

// Indexes for better query performance
contentSchema.index({ page: 1 });
contentSchema.index({ isPublished: 1 });

module.exports = mongoose.model('Content', contentSchema);
