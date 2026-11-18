
const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Patient name is required"],
      trim: true,
    },

    age: {
      type: Number,
      required: [true, "Patient age is required"],
      min: 0,
    },

    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: true,
    },

    condition: {
      type: String,
      required: [true, "Patient condition is required"],
      trim: true,
    },

    phone: {
      type: String,
      trim: true,
    },

    email: {
      type: String,
      lowercase: true,
      trim: true,
    },

    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: [true, "Doctor reference is required"],
    },
  },
  {
    timestamps: true,
  }
);

// Common query indexes
patientSchema.index({ doctor: 1, createdAt: -1 });
patientSchema.index({ condition: 1 });
patientSchema.index({ createdAt: -1 });

const Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient;
