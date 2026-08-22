const asyncHandler = require('../utils/asyncHandler');
const { sendSuccess } = require('../utils/apiResponse');
const User = require('../models/User');
const Trip = require('../models/Trip');

exports.getAnalytics = asyncHandler(async (req, res) => {
  const totalUsers = await User.countDocuments();
  const totalTrips = await Trip.countDocuments();
  sendSuccess(res, 200, 'Admin metrics', { totalUsers, totalTrips });
});
