const doctorService = require("../services/doctor.service")

const createDoctor = async (req, res, next) => {
    try {
        const doctor = await doctorService.createDoctor(req.body);
        console.log({doctor})

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

        if(!require("mongoose").isValidObjectId(id)){
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



module.exports = {
    createDoctor,
    getDoctors,
    getDoctorById
}