const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Doctor name is required'],
    },
    isVerified: {
      type: Boolean,
      default: false, 
    },
    specialty: {
      type: String,
      required: [true, 'Specialty is required'],
    },
    experienceYears: {
      type: Number,
      required: [true, 'Years of experience is required'],
    },
    rating: {
      type: Number,
      default: 0,
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
    // Hospital reference (Required or optional based on your setup)
    hospital: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Hospital',
      required: false, // False kar sakte hain agar kuch doctors sirf clinic ke hain
    },
    // Naya Clinic reference add kar diya hai
    clinic: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Clinic',
      required: false,
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
    },
    consultationFee: {
      type: Number,
      required: [true, 'Consultation fee is required'],
    },
    isAvailableToday: {
      type: Boolean,
      default: true,
    },
    availableSlots: [
      {
        type: String,
      }
    ],
  },
  {
    timestamps: true,
  }
);

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;