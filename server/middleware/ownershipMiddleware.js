const Trip = require('../models/Trip');

const checkTripOwnership = async (req, res, next) => {
  try {
    const trip = await Trip.findById(req.params.id || req.params.tripId);
    if (!trip) {
      return res.status(404).json({ success: false, message: 'Trip not found' });
    }

    if (trip.ownerId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Access denied: You do not own this trip' });
    }

    req.trip = trip;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { checkTripOwnership };
