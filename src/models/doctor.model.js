const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
    },
    specialization: {
        type: String,
        required: [true, 'Specialization is required'],
        trim: true,
    },
    hospital: {
        type: String,
        required: [true, 'Hospital is required'],
        trim: true,
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
    }
},{timestamps: true});

const Doctor = mongoose.model('Doctor', userSchema);

module.exports = Doctor;