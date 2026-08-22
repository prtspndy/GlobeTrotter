const Trip = require('../models/Trip');

const addStopToTrip = async (tripId, stopData) => {
  const trip = await Trip.findById(tripId);
  trip.stops.push(stopData);
  await trip.save();
  return trip;
};

module.exports = { addStopToTrip };
