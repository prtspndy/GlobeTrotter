const asyncHandler = require('../utils/asyncHandler');
const { sendSuccess } = require('../utils/apiResponse');
const User = require('../models/User');

exports.updateProfile = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(req.user._id, req.body, { new: true }).select('-passwordHash');
  sendSuccess(res, 200, 'Profile updated successfully', user);
});
