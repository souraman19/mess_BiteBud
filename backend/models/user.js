// backend/models/user.js

const { type } = require('@testing-library/user-event/dist/type');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    dob: { type: String, required: true },
    email: { type: String, required: true },
    registered: { type: String, required: true },
    password: { type: String }, // Make password optional
    identity: { type: String, required: true },
    hostel: { type: String, },
    otp: { type: String },
    name:{type: String},
    year:{type: String},
    profilePicture: { type: String },
    // Add other fields as needed
  });

const User = mongoose.model('user', userSchema);

module.exports = User;
