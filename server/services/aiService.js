const { generateItineraryWithAI } = require('../integrations/ai/aiProvider');
const Trip = require('../models/Trip');

const generateAITripForUser = async (userId, params) => {
  const aiResult = await generateItineraryWithAI(params);
  return await Trip.create({
    ...aiResult,
    ownerId: userId,
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0]
  });
};

module.exports = { generateAITripForUser };
