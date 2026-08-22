const validateActivity = (data) => {
  const errors = [];
  if (!data.name) errors.push('Activity name is required');
  return { error: errors.length ? { details: errors.map(m => ({ message: m })) } : null };
};

module.exports = { validateActivity };
