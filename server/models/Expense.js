const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
  tripId: { type: mongoose.Schema.Types.ObjectId, ref: 'Trip', required: true },
  title: { type: String, required: true },
  category: { type: String, enum: ['transport', 'accommodation', 'activity', 'meal', 'other'], default: 'other' },
  amount: { type: Number, required: true },
  date: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Expense', ExpenseSchema);
