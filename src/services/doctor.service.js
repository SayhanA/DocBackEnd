const Doctor = require("../models/doctor.model");
const AppError = require("../utils/app-error");

const escapeRegex = (value) => {
    return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

const createDoctor = async (data) => {
    try {
        return await Doctor.create(data);
    } catch (error) {
        if(error.code === 11000){
            throw new AppError("Doctor email already exists", 409);
        }

        throw error;
    }
};



module.exports = {
    escapeRegex,
    createDoctor
}