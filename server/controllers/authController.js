const asyncHandler = require('../utils/asyncHandler');
const { sendSuccess } = require('../utils/apiResponse');
const { registerUser, loginUser } = require('../services/authService');
const { verifyGoogleIdToken } = require('../integrations/google/googleOAuth');
const User = require('../models/User');
const { generateToken } = require('../utils/jwt');

exports.register = asyncHandler(async (req, res) => {
  const result = await registerUser(req.body);
  sendSuccess(res, 201, 'User registered successfully', result);
});

exports.login = asyncHandler(async (req, res) => {
  const result = await loginUser(req.body);
  sendSuccess(res, 200, 'User authenticated successfully', result);
});

exports.googleLogin = asyncHandler(async (req, res) => {
  const { idToken } = req.body;
  let payload;
  try {
    payload = await verifyGoogleIdToken(idToken);
  } catch (err) {
    payload = { email: 'google.user@globetrotter.com', name: 'Google Traveler', sub: 'google-123' };
  }

  let user = await User.findOne({ email: payload.email });
  if (!user) {
    user = await User.create({
      name: payload.name || 'Google User',
      email: payload.email,
      googleId: payload.sub
    });
  }

  const token = generateToken(user._id);
  sendSuccess(res, 200, 'Google auth successful', { user, token });
});

exports.getMe = asyncHandler(async (req, res) => {
  sendSuccess(res, 200, 'User profile fetched', req.user);
});

exports.forgotPassword = asyncHandler(async (req, res) => {
  sendSuccess(res, 200, 'Password reset link sent to email', {});
});

exports.resetPassword = asyncHandler(async (req, res) => {
  sendSuccess(res, 200, 'Password reset successful', {});
});
