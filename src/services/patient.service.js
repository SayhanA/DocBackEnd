const Doctor = require("../models/doctor.model");
const Patient = require("../models/patient.model");

const escapeRegex = (value) => {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

const verifyDoctor = async (doctorId) => {
    const doctor = await Doctor.findById(doctorId);

    if(!doctor){
        throw new AppError("Doctor Not Found!", 404);
    }

    return doctor;
}

const createPatient = async (data) => {
    await verifyDoctor(data.doctor);

    const patient = await Patient.create(data);

    return Patient.findById(patient._id).populate(
        "doctor",
        "name specialization hospital"
    );
}



module.exports = {
    escapeRegex,
    verifyDoctor,
    createPatient
}