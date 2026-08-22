const asyncHandler = require('../utils/asyncHandler');
const { sendSuccess } = require('../utils/apiResponse');
const Trip = require('../models/Trip');

exports.addStop = asyncHandler(async (req, res) => {
  const trip = await Trip.findById(req.params.tripId);
  trip.stops.push(req.body);
  await trip.save();
  sendSuccess(res, 201, 'Stop added', trip);
});
