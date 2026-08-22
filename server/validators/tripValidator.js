const validateTrip = (data) => {
  const errors = [];
  if (!data.title) errors.push('Trip title is required');
  if (!data.startDate) errors.push('Start date is required');
  if (!data.endDate) errors.push('End date is required');
  if (data.startDate && data.endDate && new Date(data.endDate) < new Date(data.startDate)) {
    errors.push('End date must be on or after start date');
  }
  return { error: errors.length ? { details: errors.map(m => ({ message: m })) } : null };
};

module.exports = { validateTrip };
