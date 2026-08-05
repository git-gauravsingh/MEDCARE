// File: medcare-backend/models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: true, 
      trim: true 
    },
    email: { 
      type: String, 
      required: true, 
      unique: true, 
      lowercase: true, 
      trim: true 
    },
    password: { 
      type: String, 
      required: true, 
      minlength: 6 
    },
    role: { 
      type: String, 
      enum: ['patient', 'doctor', 'admin'], 
      default: 'patient' 
    },
    contactInfo: {
      phone: { type: String, trim: true },
      address: { type: String, trim: true }
    }
  },
  { timestamps: true }
);

// Pre-save hook to hash the password before saving to MongoDB
userSchema.pre('save', async function () {
  // Agar password modify nahi hua hai (yaani naya nahi hai), toh aage badho
  if (!this.isModified('password')) return;

  // Password ko encrypt (hash) karo
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Login ke time entered password aur database wale hashed password ko compare karne ka function
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);