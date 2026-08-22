const mongoose = require('mongoose');
require('dotenv').config();
const City = require('../models/City');

const seedCities = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/globetrotter');
    await City.deleteMany();
    await City.insertMany([
      {
        name: 'Rome',
        country: 'Italy',
        region: 'Europe',
        description: 'The Eternal City, where ancient history meets vibrant street life.',
        image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200&q=80',
        costIndex: 'moderate',
        popularity: 98
      },
      {
        name: 'Paris',
        country: 'France',
        region: 'Europe',
        description: 'City of Light, iconic romance, and world-class museums.',
        image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80',
        costIndex: 'luxury',
        popularity: 99
      },
      {
        name: 'Tokyo',
        country: 'Japan',
        region: 'Asia',
        description: 'Futuristic metropolis blending neon skyscrapers with historic temples.',
        image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80',
        costIndex: 'moderate',
        popularity: 97
      }
    ]);
    console.log('Cities Seeded Successfully');
    process.exit(0);
  } catch (error) {
    console.error('Seed Error:', error);
    process.exit(1);
  }
};

if (require.main === module) seedCities();
