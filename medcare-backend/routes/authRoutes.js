// File: medcare-backend/routes/authRoutes.js
const express = require('express');
const { registerUser, loginUser, getUserProfile } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware'); // Guard (Middleware) import kiya

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

// Naya Protected Route
// Dhyan do: 'protect' middleware pehle likha hai, phir controller
router.get('/profile', protect, getUserProfile); 

module.exports = router;