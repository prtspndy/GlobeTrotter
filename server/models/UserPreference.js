const mongoose = require('mongoose');

const UserPreferenceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  travelStyle: [{ type: String }],
  preferredCurrency: { type: String, default: 'USD' }
}, { timestamps: true });

module.exports = mongoose.model('UserPreference', UserPreferenceSchema);
