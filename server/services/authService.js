const User = require('../models/User');
const { generateToken } = require('../utils/jwt');
const { hashPassword, comparePassword } = require('../utils/password');

const registerUser = async ({ name, email, password }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('Email is already registered');
  }

  const passwordHash = await hashPassword(password);
  const user = await User.create({ name, email, passwordHash });
  const token = generateToken(user._id);

  return { user, token };
};

const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password))) {
    throw new Error('Invalid email or password');
  }

  const token = generateToken(user._id);
  return { user, token };
};

module.exports = { registerUser, loginUser };
