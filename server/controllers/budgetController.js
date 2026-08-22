const asyncHandler = require('../utils/asyncHandler');
const { sendSuccess } = require('../utils/apiResponse');
const Trip = require('../models/Trip');

exports.getBudget = asyncHandler(async (req, res) => {
  const trip = await Trip.findById(req.params.tripId);
  sendSuccess(res, 200, 'Budget details', { totalBudget: trip.totalBudget, expenses: trip.expenses });
});
