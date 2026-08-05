require('dotenv').config();
const mongoose = require('mongoose');
const Hospital = require('./models/Hospital');
const Doctor = require('./models/Doctor');
const hospitals = require('./data/hospitalList.js');

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB Connected for Direct Hospital-Doctor Seeding'))
.catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

const seedDatabase = async () => {
  try {
    await Hospital.deleteMany({});
    await Doctor.deleteMany({});
    console.log('Cleared existing hospitals and doctors...');

    for (let hData of hospitals) {
      const { doctorsList, ...hospitalInfo } = hData;

      const hospital = new Hospital(hospitalInfo);
      const savedHospital = await hospital.save();

      let createdDoctorIds = [];

      if (doctorsList && doctorsList.length > 0) {
        for (let dData of doctorsList) {
          const newDoctor = new Doctor({
            ...dData,
            hospital: savedHospital._id,
            // Agar doctor object mein location nahi hai, toh hospital ke address/city se map kar rahe hain
            location: dData.location || (savedHospital.address + ", " + savedHospital.city),
            isVerified: dData.isVerified !== undefined ? dData.isVerified : true,
            isAvailableToday: dData.isAvailableToday !== undefined ? dData.isAvailableToday : true
          });

          const savedDoctor = await newDoctor.save();
          createdDoctorIds.push(savedDoctor._id);
        }

        savedHospital.doctors = createdDoctorIds;
        await savedHospital.save();
      }

      console.log(`Successfully seeded Hospital: ${savedHospital.name} with ${createdDoctorIds.length} doctors.`);
    }

    console.log('\n🎉 All hospitals and their respective doctors seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedDatabase();