const mongoose = require('mongoose');

const BudgetSchema = new mongoose.Schema({
  tripId: { type: mongoose.Schema.Types.ObjectId, ref: 'Trip', required: true, unique: true },
  totalBudget: { type: Number, required: true, default: 2000 },
  currency: { type: String, default: 'USD' }
}, { timestamps: true });

module.exports = mongoose.model('Budget', BudgetSchema);
