const express = require('express');
const router = express.Router();
const budgetController = require('../controllers/budgetController');
const { protect } = require('../middleware/authMiddleware');

router.get('/:tripId/budget', protect, budgetController.getBudget);

module.exports = router;
