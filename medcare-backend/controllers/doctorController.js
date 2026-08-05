const Doctor = require('../models/Doctor');
const Clinic = require('../models/Clinic');

// @desc    Get all doctors from both Doctor collection and Clinic nested lists
// @route   GET /api/doctors
// @access  Public
const getDoctors = async (req, res) => {
  try {
    // 1. Independent Doctors (Hospital ya Clinic se linked independent records)
    const independentDoctors = await Doctor.find({})
      .populate('hospital', 'name city')
      .populate('clinic', 'name city')
      .lean();

    const formattedDoctors = independentDoctors.map(doc => ({
      ...doc,
      sourceType: doc.hospital ? 'Hospital' : (doc.clinic ? 'Clinic' : 'Independent'),
      locationName: doc.hospital?.name 
        ? `${doc.hospital.name}, ${doc.hospital.city || ''}` 
        : (doc.clinic?.name ? `${doc.clinic.name}, ${doc.clinic.city || ''}` : (doc.location || 'Patna'))
    }));

    // 2. Nested Doctors inside Clinics
    const clinics = await Clinic.find({}).lean();

    let clinicDoctors = [];

    clinics.forEach(clinic => {
      const docList = clinic.doctorsList || clinic.doctors || []; 
      
      if (Array.isArray(docList) && docList.length > 0) {
        docList.forEach(doc => {
          clinicDoctors.push({
            ...doc,
            _id: doc._id || doc.id,
            clinic: {
              _id: clinic._id,
              name: clinic.name,
              city: clinic.city
            },
            locationName: `${clinic.name}, ${clinic.city || 'Patna'}`,
            sourceType: 'Clinic'
          });
        });
      }
    });

    const allDoctors = [...formattedDoctors, ...clinicDoctors];
    res.status(200).json(allDoctors);
  } catch (error) {
    res.status(500).json({ message: 'Server Error: Unable to fetch doctors', error: error.message });
  }
};

// @desc    Add a new independent doctor
// @route   POST /api/doctors
// @access  Public
const addDoctor = async (req, res) => {
  try {
    const newDoctor = new Doctor(req.body);
    const savedDoctor = await newDoctor.save();
    res.status(201).json(savedDoctor);
  } catch (error) {
    res.status(400).json({ message: 'Failed to add doctor', error: error.message });
  }
};

// @desc    Get doctor by ID
// @route   GET /api/doctors/:id
// @access  Public
const getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id)
      .populate('hospital', 'name city')
      .populate('clinic', 'name city')
      .lean();
    
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    
    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Exports sabhi functions ke sath
module.exports = {
  getDoctors,
  addDoctor,
  getDoctorById,
};