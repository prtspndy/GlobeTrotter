const validateStop = (data) => {
  const errors = [];
  if (!data.cityName) errors.push('City name is required');
  return { error: errors.length ? { details: errors.map(m => ({ message: m })) } : null };
};

module.exports = { validateStop };
