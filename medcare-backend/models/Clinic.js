const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  isVerified: { type: Boolean, default: true },
  specialty: { type: String, required: true },
  experienceYears: { type: Number, required: true },
  rating: { type: Number, default: 4.5 },
  reviewCount: { type: Number, default: 0 },
  consultationFee: { type: Number, required: true },
  isAvailableToday: { type: Boolean, default: true },
  availableSlots: [{ type: String }]
});

const clinicSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true }, // e.g., Dental, Eye, Skin
  brief: [{ type: String }],
  about: { type: String },
  address: { type: String, required: true },
  city: { type: String, required: true },
  distance: { type: String }, // e.g., "2.1 km away"
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  contactNumber: { type: String, required: true },
  email: { type: String },
  openingHours: { type: String },
  isOpenNow: { type: Boolean, default: true },
  facilities: [{ type: String }], // e.g., ["Parking", "Accessible", "WiFi"]
  rating: { type: Number, default: 4.5 },
  reviewCount: { type: Number, default: 0 },
  isVerified: { type: Boolean, default: true },
  doctorsList: [doctorSchema] // Nested doctors
}, { timestamps: true });

module.exports = mongoose.model('Clinic', clinicSchema);