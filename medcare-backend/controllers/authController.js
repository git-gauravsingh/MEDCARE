// File: medcare-backend/controllers/authController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Helper function: JWT Token generate karne ke liye
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d', // Token 30 din tak valid rahega
  });
};

// @desc    Register a new user
// @route   POST /api/auth/register
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, role, contactInfo } = req.body;

    // Check karte hain ki kya is email se user pehle se exist karta hai
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // Naya user create karo (password 'User.js' ke pre-save hook se automatically hash ho jayega)
    const user = await User.create({
      name,
      email,
      password,
      role,
      contactInfo
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id)
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Login user & get token
// @route   POST /api/auth/login
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Database mein user ko uske email se dhundo
    const user = await User.findOne({ email });

    // Agar user mil gaya aur password match ho gaya (User.js ka matchPassword function use karke)
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id)
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private (Requires Token)
exports.getUserProfile = async (req, res) => {
  try {
    // req.user humein hamare 'protect' middleware se mil chuka hai
    const user = await User.findById(req.user._id);

    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        contactInfo: user.contactInfo
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};