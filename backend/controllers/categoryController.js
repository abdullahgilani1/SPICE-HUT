const Category = require('../models/Category');

// Get all categories
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    // return minimal shape to frontend
    res.json(categories.map(c => ({ _id: c._id, name: c.name, description: c.description })));
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Create new category (admin only)
const createCategory = async (req, res) => {
  const { name, description } = req.body;
  if (!name) return res.status(400).json({ message: 'Category name is required' });

  try {
    const exists = await Category.findOne({ name: new RegExp(`^${name}$`, 'i') });
    if (exists) return res.status(400).json({ message: 'Category already exists' });

    const category = await Category.create({ name, description });
    res.status(201).json({ _id: category._id, name: category.name, description: category.description });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete category (admin only)
const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const cat = await Category.findById(id);
    if (!cat) return res.status(404).json({ message: 'Category not found' });
    await cat.deleteOne();
    res.json({ message: 'Category deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getCategories, createCategory, deleteCategory };
