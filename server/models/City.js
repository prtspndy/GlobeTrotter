const mongoose = require('mongoose');

const CitySchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  country: { type: String, required: true, trim: true },
  region: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  costIndex: { type: String, enum: ['budget', 'moderate', 'luxury'], default: 'moderate' },
  popularity: { type: Number, default: 80 },
  coordinates: {
    lat: { type: Number },
    lng: { type: Number }
  }
}, { timestamps: true });

module.exports = mongoose.model('City', CitySchema);
