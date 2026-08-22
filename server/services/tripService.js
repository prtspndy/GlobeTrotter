const Trip = require('../models/Trip');

const getUserTrips = async (userId) => {
  return await Trip.find({ ownerId: userId }).sort({ createdAt: -1 });
};

const createTrip = async (userId, tripData) => {
  return await Trip.create({ ...tripData, ownerId: userId });
};

const getTripById = async (tripId) => {
  return await Trip.findById(tripId);
};

const updateTrip = async (tripId, tripData) => {
  return await Trip.findByIdAndUpdate(tripId, tripData, { new: true });
};

const deleteTrip = async (tripId) => {
  return await Trip.findByIdAndDelete(tripId);
};

module.exports = { getUserTrips, createTrip, getTripById, updateTrip, deleteTrip };
