const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Hospital name is required'],
      trim: true,
    },
    brief: {
      type: [String], 
      required: [true, 'Hospital brief is required'],
    },
    address: {
      type: String,
      required: [true, 'Address is required'],
    },
    city: {
      type: String,
      required: [true, 'City is required'],
    },
    location: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true }
    },
    contactNumber: {
      type: String,
      required: [true, 'Contact number is required'],
    },
    email: {
      type: String,
    },
    hospitalType: {
      type: String,
      enum: ['Government', 'Private', 'Semi-Government', 'Trust'],
      default: 'Private'
    },
    facilities: {
      type: [String],
    },
    rating: {
      type: Number,
      default: 0,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    doctors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor'
      }
    ]
  },
  {
    timestamps: true,
  }
);

const Hospital = mongoose.model('Hospital', hospitalSchema);

module.exports = Hospital;