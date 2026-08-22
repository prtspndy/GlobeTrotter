const asyncHandler = require('../utils/asyncHandler');
const { sendSuccess } = require('../utils/apiResponse');
const City = require('../models/City');

exports.getCities = asyncHandler(async (req, res) => {
  const cities = await City.find();
  sendSuccess(res, 200, 'Cities retrieved', cities);
});

exports.getCityById = asyncHandler(async (req, res) => {
  const city = await City.findById(req.params.id);
  sendSuccess(res, 200, 'City details retrieved', city);
});
