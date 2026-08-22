const asyncHandler = require('../utils/asyncHandler');
const { sendSuccess } = require('../utils/apiResponse');
const tripService = require('../services/tripService');

exports.getTrips = asyncHandler(async (req, res) => {
  const trips = await tripService.getUserTrips(req.user._id);
  sendSuccess(res, 200, 'User trips retrieved', trips);
});

exports.createTrip = asyncHandler(async (req, res) => {
  const trip = await tripService.createTrip(req.user._id, req.body);
  sendSuccess(res, 201, 'Trip created successfully', trip);
});

exports.getTrip = asyncHandler(async (req, res) => {
  const trip = await tripService.getTripById(req.params.id);
  sendSuccess(res, 200, 'Trip details retrieved', trip);
});

exports.updateTrip = asyncHandler(async (req, res) => {
  const trip = await tripService.updateTrip(req.params.id, req.body);
  sendSuccess(res, 200, 'Trip updated successfully', trip);
});

exports.deleteTrip = asyncHandler(async (req, res) => {
  await tripService.deleteTrip(req.params.id);
  sendSuccess(res, 200, 'Trip deleted successfully', {});
});
