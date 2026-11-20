const doctorService = require("../services/doctor.service");
const mongoose = require("mongoose");
const AppError = require("../utils/app-error");

const createDoctor = async (req, res, next) => {
    try {
        const doctor = await doctorService.createDoctor(req.body);

        res.status(201).json({
            success: true,
            message: "Doctor created successfully",
            doctor
        })
    } catch (error) {
        next(error);
    }
};

const getDoctors = async (req, res, next) => {
    try {
        const filters = req.validated.query;

        const result = await doctorService.getDoctors(filters);

        res.status(200).json({
            success: true,
            ...result
        });
    } catch (error) {
        next(error)
    }
}

const getDoctorById = async (req, res, next) => {
    try {
        const {id} = req.params;

        if(!mongoose.isValidObjectId(id)){
            throw new AppError("Invalid doctor ID", 400);
        }

        const doctor = await doctorService.getDoctorById(id);

        res.status(200).json({
            success: true,
            doctor
        })

    } catch (error) {
        next(error);
    }
}

const updateDoctor = async ( req, res, next ) => {
    try {
        const {id} = req.params;

        if(!mongoose.isValidObjectId(id)){
            throw new AppError("Invalid Doctor Id", 400);
        }

        const doctor = await doctorService.updateDoctor(id, req.body);

        res.status(200).json({
            success: true,
            message: "Doctor data updated successfully",
            doctor
        })
    } catch (error) {
        next(error);
    }
}

const deleteDoctor = async ( req, res, next ) => {
    try {
        const { id } = req.params;

        if(!mongoose.isValidObjectId(id)){
            throw new AppError("Invalid Doctor Id", 400);
        }

        const doctor = await doctorService.deleteDoctor(id);

        res.status(200).json({
            success: true,
            message: "Doctor Deleted Successfully",
            doctor
        })
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createDoctor,
    getDoctors,
    getDoctorById,
    updateDoctor,
    deleteDoctor
}