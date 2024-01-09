// backend/models/user.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    dob: { type: String, required: true },
    email: { type: String, required: true },
    registered: { type: String, required: true },
    password: { type: String }, // Make password optional
    identity: { type: String, required: true },
    otp: { type: String },
    // Add other fields as needed
  });

const User = mongoose.model('user', userSchema);

module.exports = User;
