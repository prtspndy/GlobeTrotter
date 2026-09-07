require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET must be configured before starting the server');
}

// Connect Database & Start HTTP Server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`GlobeTrotter REST Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  });
}).catch(err => {
  console.error('Failed to start server:', err);
});
