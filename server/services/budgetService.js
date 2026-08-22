const Trip = require('../models/Trip');

const addExpenseToTrip = async (tripId, expenseData) => {
  const trip = await Trip.findById(tripId);
  trip.expenses.push(expenseData);
  await trip.save();
  return trip;
};

module.exports = { addExpenseToTrip };
