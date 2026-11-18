const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
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
        lowercase: true,
        trim: true,
    }
},{timestamps: true});

doctorSchema.index({ email: 1 });
doctorSchema.index({ specialization: 1 });
doctorSchema.index({ createdAt: -1 })

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;