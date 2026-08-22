const mongoose = require('mongoose');

const TripStopSchema = new mongoose.Schema({
  tripId: { type: mongoose.Schema.Types.ObjectId, ref: 'Trip', required: true },
  cityId: { type: mongoose.Schema.Types.ObjectId, ref: 'City', required: true },
  cityName: { type: String, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  order: { type: Number, default: 1 }
}, { timestamps: true });

module.exports = mongoose.model('TripStop', TripStopSchema);
