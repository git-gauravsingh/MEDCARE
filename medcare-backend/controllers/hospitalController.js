const Hospital = require('../models/Hospital');
const Doctor = require('../models/Doctor');

// @desc    Get all hospitals
// @route   GET /api/hospitals
// @access  Public
const getHospitals = async (req, res) => {
  try {
    const hospitals = await Hospital.find({}).lean();
    
    // Har hospital ke liye usse jude hue doctors manually fetch karke attach karo
    const hospitalsWithDoctors = await Promise.all(
      hospitals.map(async (hospital) => {
        const docs = await Doctor.find({ hospital: hospital._id }).lean();
        return {
          ...hospital,
          doctors: docs // Ab yahan poora doctor object aayega, sirf ID nahi
        };
      })
    );

    res.status(200).json(hospitalsWithDoctors);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Create a new hospital
// @route   POST /api/hospitals
// @access  Public
const createHospital = async (req, res) => {
  try {
    const newHospital = new Hospital(req.body);
    const savedHospital = await newHospital.save();
    res.status(201).json(savedHospital);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create hospital', error: error.message });
  }
};

// @desc    Get hospital by ID along with its doctors
// @route   GET /api/hospitals/:id
// @access  Public
const getHospitalById = async (req, res) => {
  try {
    const hospital = await Hospital.findById(req.params.id).lean();
    
    if (!hospital) {
      return res.status(404).json({ message: 'Hospital not found' });
    }

    // Us hospital se linked saare doctors find karein
    const doctors = await Doctor.find({ hospital: hospital._id }).lean();

    res.status(200).json({
      hospital,
      doctors
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = {
  getHospitals,
  createHospital,
  getHospitalById,
};