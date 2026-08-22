const mongoose = require('mongoose');
require('dotenv').config();
const User = require('../models/User');
const { hashPassword } = require('../utils/password');

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/globetrotter');
    const adminExists = await User.findOne({ email: 'admin@globetrotter.com' });
    if (!adminExists) {
      const passwordHash = await hashPassword('admin123');
      await User.create({
        name: 'System Admin',
        email: 'admin@globetrotter.com',
        passwordHash,
        role: 'admin'
      });
      console.log('Admin User Seeded Successfully');
    }
    process.exit(0);
  } catch (error) {
    console.error('Seed Admin Error:', error);
    process.exit(1);
  }
};

if (require.main === module) seedAdmin();
