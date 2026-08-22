const mongoose = require('mongoose');

const PublicShareSchema = new mongoose.Schema({
  tripId: { type: mongoose.Schema.Types.ObjectId, ref: 'Trip', required: true },
  shareId: { type: String, required: true, unique: true },
  clonesCount: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('PublicShare', PublicShareSchema);
