const MenuItem = require('../models/MenuItem');
const fs = require('fs');
const path = require('path');

// Get all menu items (admin or public)
const getMenuItems = async (req, res) => {
  try {
    const items = await MenuItem.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Create a new menu item (admin only)
const createMenuItem = async (req, res) => {
  try {
    // debug: log incoming payload and file metadata
    console.debug('createMenuItem payload:', { body: req.body, file: req.file && { originalname: req.file.originalname, mimetype: req.file.mimetype, size: req.file.size } });
    const { name, category, price, status, image, description, subCategory } = req.body;
    if (!name || !category || price == null) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    // if a file was uploaded via multer, prefer that path
    let imagePath = image;
    if (req.file && req.file.filename) {
      imagePath = `/uploads/${req.file.filename}`;
    }
    const item = await MenuItem.create({ name, category, price, status, image: imagePath, description, subCategory });
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update a menu item (admin only)
const updateMenuItem = async (req, res) => {
  try {
    const item = await MenuItem.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Menu item not found' });

  const { name, category, price, status, image, description, subCategory } = req.body;
    item.name = name ?? item.name;
    item.category = category ?? item.category;
    item.price = price ?? item.price;
    item.status = status ?? item.status;
    // if a new file was uploaded, use it; otherwise use provided image or existing
    if (req.file && req.file.filename) {
      item.image = `/uploads/${req.file.filename}`;
    } else {
      item.image = image ?? item.image;
    }
  item.subCategory = subCategory ?? item.subCategory;
    item.description = description ?? item.description;

    await item.save();
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete a menu item (admin only)
const deleteMenuItem = async (req, res) => {
  try {
    // find and delete the DB record first
    const item = await MenuItem.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: 'Menu item not found' });

    // debug
    console.debug('Deleted menu item from DB:', item._id);

    // if item had an uploaded file under /uploads, try to remove it from disk
    try {
      if (item.image && item.image.startsWith('/uploads')) {
        const filename = path.basename(item.image);
        const filePath = path.join(__dirname, '..', 'uploads', filename);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
          console.debug('Deleted uploaded file:', filePath);
        }
      }
    } catch (fsErr) {
      // log and continue - file deletion shouldn't block the response
      console.warn('Failed to delete uploaded file for menu item', fsErr);
    }

    return res.json({ message: 'Menu item deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getMenuItems, createMenuItem, updateMenuItem, deleteMenuItem };
