require('dotenv').config();
const mongoose = require('mongoose');
const Clinic = require('./models/Clinic');
const clinicsData = require('./data/clinicList');

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('MongoDB Connected for Clinic Seeding...');
    
    await Clinic.deleteMany({});
    console.log('Cleared existing clinics...');

    await Clinic.insertMany(clinicsData);
    console.log('🎉 All clinics and their doctors seeded successfully!');

    process.exit(0);
  })
  .catch(err => {
    console.error('Seeding error:', err);
    process.exit(1);
  });