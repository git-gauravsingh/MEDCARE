// File: medcare-backend/server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const doctorRoutes = require('./routes/doctorRoutes');
const hospitalRoutes = require('./routes/hospitalRoutes');
const clinicRoutes = require('./routes/clinicRoutes');


// Load environment variables
dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(cors()); // Allow cross-origin requests from React
app.use(express.json()); // Allow parsing of JSON bodies
app.use('/api/doctors', doctorRoutes);
app.use('/api/hospitals', hospitalRoutes);
app.use('/api/clinics', clinicRoutes);


// Basic Health Check Route
app.get('/', (req, res) => {
  res.send('MEDCARE API is running...');
});

// Define Routes
// Yahan humne apne naye authRoutes ko '/api/auth' path par connect kar diya hai
app.use('/api/auth', require('./routes/authRoutes'));

// (Future routes ke liye placeholder)
// app.use('/api/facilities', require('./routes/facilityRoutes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});