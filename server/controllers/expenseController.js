const asyncHandler = require('../utils/asyncHandler');
const { sendSuccess } = require('../utils/apiResponse');
const Trip = require('../models/Trip');

exports.addExpense = asyncHandler(async (req, res) => {
  const trip = await Trip.findById(req.params.tripId);
  trip.expenses.push(req.body);
  await trip.save();
  sendSuccess(res, 201, 'Expense added', trip);
});
