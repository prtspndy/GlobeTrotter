const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');
const { authorizeAdmin } = require('../middleware/adminMiddleware');

router.get('/analytics', protect, authorizeAdmin, adminController.getAnalytics);

module.exports = router;
