const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');
const { protect } = require('../middleware/authMiddleware');

router.post('/:tripId/expenses', protect, expenseController.addExpense);

module.exports = router;
