const City = require('../models/City');

const getRecommendedCities = async () => {
  return await City.find().sort({ popularity: -1 }).limit(6);
};

module.exports = { getRecommendedCities };
