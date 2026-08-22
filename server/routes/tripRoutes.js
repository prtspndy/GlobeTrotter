const express = require('express');
const router = express.Router();
const tripController = require('../controllers/tripController');
const { protect } = require('../middleware/authMiddleware');
const { checkTripOwnership } = require('../middleware/ownershipMiddleware');

router.route('/')
  .get(protect, tripController.getTrips)
  .post(protect, tripController.createTrip);

router.route('/:id')
  .get(protect, checkTripOwnership, tripController.getTrip)
  .put(protect, checkTripOwnership, tripController.updateTrip)
  .delete(protect, checkTripOwnership, tripController.deleteTrip);

module.exports = router;
