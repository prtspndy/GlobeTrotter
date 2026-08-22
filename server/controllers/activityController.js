const asyncHandler = require('../utils/asyncHandler');
const { sendSuccess } = require('../utils/apiResponse');
const Activity = require('../models/Activity');

exports.getActivities = asyncHandler(async (req, res) => {
  const activities = await Activity.find();
  sendSuccess(res, 200, 'Activities retrieved', activities);
});

exports.getActivityById = asyncHandler(async (req, res) => {
  const activity = await Activity.findById(req.params.id);
  sendSuccess(res, 200, 'Activity details retrieved', activity);
});
