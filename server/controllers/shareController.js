const asyncHandler = require('../utils/asyncHandler');
const { sendSuccess } = require('../utils/apiResponse');
const { createShareLink, copySharedTrip } = require('../services/shareService');
const Trip = require('../models/Trip');

exports.shareTrip = asyncHandler(async (req, res) => {
  const shareId = await createShareLink(req.params.tripId);
  sendSuccess(res, 200, 'Share link generated', { shareId });
});

exports.getPublicTrip = asyncHandler(async (req, res) => {
  const trip = await Trip.findOne({ shareId: req.params.shareId });
  if (!trip) return res.status(404).json({ success: false, message: 'Shared trip not found' });
  sendSuccess(res, 200, 'Public trip retrieved', trip);
});

exports.copyTrip = asyncHandler(async (req, res) => {
  const cloned = await copySharedTrip(req.params.shareId, req.user._id);
  sendSuccess(res, 201, 'Trip copied to account', cloned);
});
