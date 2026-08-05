const express = require('express');
const router = express.Router();
// getDoctorById ko yahan import kiya
const { getDoctors, addDoctor, getDoctorById } = require('../controllers/doctorController');

router.route('/').get(getDoctors).post(addDoctor);

// Naya route specific doctor ki ID ke liye
router.route('/:id').get(getDoctorById);

module.exports = router;