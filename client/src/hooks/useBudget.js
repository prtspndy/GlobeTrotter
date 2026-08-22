import { useTrip } from '../context/TripContext';

export const useBudget = (tripId) => {
  const { getTrip, addExpense, deleteExpense } = useTrip();
  const trip = getTrip(tripId);

  const expenses = trip?.expenses || [];
  const totalBudget = trip?.totalBudget || 0;
  const totalSpent = expenses.reduce((acc, e) => acc + Number(e.amount), 0);
  const remaining = totalBudget - totalSpent;

  return {
    expenses,
    totalBudget,
    totalSpent,
    remaining,
    isOverBudget: remaining < 0,
    addExpenseItem: (data) => addExpense(tripId, data),
    removeExpenseItem: (expenseId) => deleteExpense(tripId, expenseId)
  };
};
