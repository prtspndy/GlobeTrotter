const express = require('express');
const router = express.Router();
const itineraryController = require('../controllers/itineraryController');
const { protect } = require('../middleware/authMiddleware');

router.post('/:tripId/stops', protect, itineraryController.addStop);

module.exports = router;
