const mongoose = require('mongoose');

const TripActivitySchema = new mongoose.Schema({
  tripId: { type: mongoose.Schema.Types.ObjectId, ref: 'Trip', required: true },
  activityId: { type: mongoose.Schema.Types.ObjectId, ref: 'Activity' },
  title: { type: String, required: true },
  dayNumber: { type: Number, required: true },
  startTime: { type: String, default: '10:00' },
  durationMinutes: { type: Number, default: 120 },
  cost: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('TripActivity', TripActivitySchema);
