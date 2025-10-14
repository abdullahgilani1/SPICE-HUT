const express = require('express');
const router = express.Router();
const { getMenuItems, createMenuItem, updateMenuItem, deleteMenuItem } = require('../controllers/menuController');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const multer = require('multer');
const path = require('path');

// simple disk storage for uploads
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.join(__dirname, '..', 'uploads'));
	},
	filename: function (req, file, cb) {
		const ext = path.extname(file.originalname);
		const name = `${Date.now()}-${file.fieldname}${ext}`;
		cb(null, name);
	}
});

// validate images and limit size
const imageFileFilter = (req, file, cb) => {
	const allowed = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
	if (allowed.includes(file.mimetype)) cb(null, true);
	else cb(new Error('Invalid file type. Only jpg, png and webp are allowed.'), false);
};

const upload = multer({ storage, fileFilter: imageFileFilter, limits: { fileSize: 2 * 1024 * 1024 } }); // 2MB

// Public: get menu items
router.get('/', getMenuItems);

// Admin-only: manage menu items
router.post('/', protect, adminOnly, upload.single('imageFile'), createMenuItem);
router.put('/:id', protect, adminOnly, upload.single('imageFile'), updateMenuItem);
router.delete('/:id', protect, adminOnly, deleteMenuItem);

module.exports = router;
