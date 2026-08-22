const express = require('express');
const router = express.Router();
const shareController = require('../controllers/shareController');
const { protect } = require('../middleware/authMiddleware');

router.post('/:tripId/share', protect, shareController.shareTrip);

module.exports = router;
