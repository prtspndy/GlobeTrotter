require('dotenv').config();

module.exports = {
  port: process.env.PORT || 5000,
  env: process.env.NODE_ENV || 'development',
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/globetrotter',
  jwtSecret: process.env.JWT_SECRET || 'secret',
  jwtExpire: process.env.JWT_EXPIRE || '7d',
  googleClientId: process.env.GOOGLE_CLIENT_ID || '',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173'
};
