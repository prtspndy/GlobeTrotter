const express = require('express');
const router = express.Router();
const shareController = require('../controllers/shareController');
const { protect } = require('../middleware/authMiddleware');

router.get('/trips/:shareId', shareController.getPublicTrip);
router.post('/trips/:shareId/copy', protect, shareController.copyTrip);

module.exports = router;
