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

module.exports = {
    createPatient
}