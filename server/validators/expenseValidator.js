const validateExpense = (data) => {
  const errors = [];
  if (!data.title) errors.push('Expense title is required');
  if (data.amount === undefined || Number(data.amount) <= 0) errors.push('Valid expense amount is required');
  return { error: errors.length ? { details: errors.map(m => ({ message: m })) } : null };
};

module.exports = { validateExpense };
