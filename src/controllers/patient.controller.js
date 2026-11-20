const mongoose = require("mongoose");
const patientService = require("../services/patient.service");

const createPatient = async (req, res, next) => {
    try {
        const patient = await patientService.createPatient(req.body);

        res.status(201).json({
            success: true,
            message: "Patient created Successfully",
            patient
        })
    } catch (error) {
        next(error);
    }
}

const getPatients = async (req, res, next) => {
    try {
        const filters = req.validated.query;

        const result = await patientService.getPatients(filters);

        res.status(200).json({
            success: true,
            ...result,
        });
    } catch (error) {
        next(error);
    }
}

const getPatientById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      throw new AppError("Invalid patient ID", 400);
    }

    const patient = await patientService.getPatientById(id);

    res.status(200).json({
      success: true,
      patient,
    });
  } catch (error) {
    next(error);
  }
};

const updatePatient = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      throw new AppError("Invalid patient ID", 400);
    }

    const patient = await patientService.updatePatient(
      id,
      req.body
    );

    res.status(200).json({
      success: true,
      message: "Patient updated successfully",
      patient,
    });
  } catch (error) {
    next(error);
  }
};

const deletePatient = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      throw new AppError("Invalid patient ID", 400);
    }

    await patientService.deletePatient(id);

    res.status(200).json({
      success: true,
      message: "Patient deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
    createPatient,
    getPatients,
    getPatientById,
    updatePatient,
    deletePatient
}