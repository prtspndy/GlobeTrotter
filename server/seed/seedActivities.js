const mongoose = require('mongoose');
require('dotenv').config();
const Activity = require('../models/Activity');

const seedActivities = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/globetrotter');
    console.log('Activities Seeded');
    process.exit(0);
  } catch (error) {
    console.error('Seed Error:', error);
    process.exit(1);
  }
};

if (require.main === module) seedActivities();
