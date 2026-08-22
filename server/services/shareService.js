const Trip = require('../models/Trip');
const { generateShareId } = require('../utils/generateShareId');

const createShareLink = async (tripId) => {
  const trip = await Trip.findById(tripId);
  if (!trip.shareId) {
    trip.shareId = generateShareId(trip.title);
    trip.visibility = 'public';
    await trip.save();
  }
  return trip.shareId;
};

const copySharedTrip = async (shareId, newOwnerId) => {
  const originalTrip = await Trip.findOne({ shareId });
  if (!originalTrip) throw new Error('Shared trip not found');

  const tripObject = originalTrip.toObject();
  delete tripObject._id;
  delete tripObject.shareId;
  tripObject.ownerId = newOwnerId;
  tripObject.title = `${originalTrip.title} (My Copy)`;
  tripObject.visibility = 'private';

  return await Trip.create(tripObject);
};

module.exports = { createShareLink, copySharedTrip };
