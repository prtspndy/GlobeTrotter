import axiosClient from './axiosClient';

export const budgetApi = {
  getBudget: (tripId) => axiosClient.get(`/trips/${tripId}/budget`),
  addExpense: (tripId, expenseData) => axiosClient.post(`/trips/${tripId}/expenses`, expenseData),
  deleteExpense: (tripId, expenseId) => axiosClient.delete(`/trips/${tripId}/expenses/${expenseId}`)
};
