const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  category: {
    type: String,
    required: true,
    enum: [
      'Appetizers',
      'Butter Dishes',
      'Korma Dishes',
      'Curry Dishes',
      'Masala Dishes',
      'Coconut Curry Dishes',
      'Tandoori Dishes',
      'Biryani Dishes',
      'Karahi Dishes',
      'Vindaloo Dishes',
      'Jalfrezi Dishes',
      'Palak Dishes',
      'Mango Curry Dishes',
      'Vegetable Dishes',
      'Indian Naan Bread',
      'Salads & Sides',
      'Spice Hut Combo Specials',
      'Indian Desserts'
    ]
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  description: {
    type: String,
    trim: true,
    maxlength: 500
  },
  image: {
    type: String,
    trim: true
  },
  tags: [{
    type: String,
    enum: ['GF', 'LF', 'VEG', 'NON-VEG', 'SPICY', 'MILD']
  }],
  isAvailable: {
    type: Boolean,
    default: true
  },
  preparationTime: {
    type: Number, // in minutes
    default: 15
  },
  ingredients: [{
    type: String,
    trim: true
  }],
  allergens: [{
    type: String,
    trim: true
  }],
  nutritionalInfo: {
    calories: Number,
    protein: Number,
    carbs: Number,
    fat: Number
  },
  popularity: {
    type: Number,
    default: 0
  }
}, { 
  timestamps: true 
});

// Indexes for better query performance
menuSchema.index({ category: 1 });
menuSchema.index({ isAvailable: 1 });
menuSchema.index({ name: 'text', description: 'text' }); // Text search

module.exports = mongoose.model('Menu', menuSchema);
