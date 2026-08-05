const Clinic = require('../models/Clinic');

// Get all clinics
const getClinics = async (req, res) => {
  try {
    const clinics = await Clinic.find({});
    res.status(200).json(clinics);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching clinics', error: error.message });
  }
};

// Get single clinic by ID (with doctors)
const getClinicById = async (req, res) => {
  try {
    const clinic = await Clinic.findById(req.params.id);
    if (!clinic) {
      return res.status(404).json({ message: 'Clinic not found' });
    }
    res.status(200).json(clinic);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching clinic details', error: error.message });
  }
};

module.exports = { getClinics, getClinicById };