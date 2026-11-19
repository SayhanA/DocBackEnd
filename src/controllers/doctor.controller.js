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



module.exports = {
    createDoctor,
}