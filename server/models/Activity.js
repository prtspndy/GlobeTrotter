const mongoose = require('mongoose');

const ActivitySchema = new mongoose.Schema({
  cityId: { type: mongoose.Schema.Types.ObjectId, ref: 'City', required: true },
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  category: { type: String, enum: ['sightseeing', 'culture', 'food', 'relaxation', 'adventure', 'shopping'], default: 'sightseeing' },
  cost: { type: Number, default: 0 },
  durationMinutes: { type: Number, default: 120 },
  image: { type: String },
  locationName: { type: String },
  popularity: { type: Number, default: 80 }
}, { timestamps: true });

module.exports = mongoose.model('Activity', ActivitySchema);
