const mongoose = require('mongoose');

const ScheduledActivitySchema = new mongoose.Schema({
  activityId: { type: mongoose.Schema.Types.ObjectId, ref: 'Activity' },
  title: { type: String, required: true },
  startTime: { type: String, default: '10:00' },
  durationMinutes: { type: Number, default: 120 },
  cost: { type: Number, default: 0 },
  category: { type: String, default: 'sightseeing' },
  locationName: { type: String },
  completed: { type: Boolean, default: false }
});

const DayItinerarySchema = new mongoose.Schema({
  dayNumber: { type: Number, required: true },
  date: { type: String, required: true },
  notes: { type: String },
  activities: [ScheduledActivitySchema]
});

const TripStopSchema = new mongoose.Schema({
  cityId: { type: mongoose.Schema.Types.ObjectId, ref: 'City' },
  cityName: { type: String, required: true },
  country: { type: String, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  days: [DayItinerarySchema]
});

const ExpenseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, enum: ['transport', 'accommodation', 'activity', 'meal', 'other'], default: 'other' },
  amount: { type: Number, required: true },
  date: { type: String, required: true }
});

const TripSchema = new mongoose.Schema({
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true, trim: true },
  description: { type: String },
  coverImage: { type: String },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  status: { type: String, enum: ['planning', 'ongoing', 'completed', 'archived'], default: 'planning' },
  totalBudget: { type: Number, default: 2000 },
  visibility: { type: String, enum: ['private', 'public'], default: 'private' },
  shareId: { type: String, unique: true, sparse: true },
  stops: [TripStopSchema],
  expenses: [ExpenseSchema]
}, { timestamps: true });

module.exports = mongoose.model('Trip', TripSchema);
