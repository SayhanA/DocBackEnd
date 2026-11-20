const Doctor = require("../models/doctor.model");
const Patient = require("../models/patient.model");
const AppError = require("../utils/app-error");

const escapeRegex = (value) => {
    return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

const createDoctor = async (data) => {
    try {
        return await Doctor.create(data);
    } catch (error) {
        if (error.code === 11000) {
            throw new AppError("Doctor email already exists", 409);
        }

        throw error;
    }
};

const getDoctors = async (filters) => {
    const { page, limit, search, specialization, hospital, startDate, endDate, sortBy, sortOrder } = filters;

    const query = {};

    if (search) {
        query.name = {
            $regex: escapeRegex(search),
            $options: "i",
        }
    }

    if (specialization) {
        query.specialization = {
            $regex: escapeRegex(specialization),
            $options: "i"
        }
    }

    if (hospital) {
        query.hospital = {
            $regex: escapeRegex(hospital),
            $options: "i"
        }
    }

    if (startDate || endDate) {
        query.createdAt = {};

        if (startDate) {
            const start = new Date(startDate);
            start.setHours(0, 0, 0, 0);
            query.createdAt.$gte = start;
        }

        if (endDate) {
            const end = new Date(endDate);
            end.setHours(24, 0, 0, 0);
            query.createdAt.$lt = end
        }
    }

    const skip = (page - 1) * limit;

    const sort = {
        [sortBy]: sortOrder === "asc" ? 1 : -1
    };

    const [doctors, total] = await Promise.all([
        Doctor.find(query).sort(sort).skip(skip).limit(limit).lean(),
        Doctor.countDocuments(query)
    ]);

    return {
        doctors,
        pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit)
        }
    }
};

const getDoctorById = async (id) => {
    const doctor = await Doctor.findOne({ _id: id });

    if (!doctor) {
        throw new AppError("Doctor not found!", 404);
    }

    return doctor;
};

const updateDoctor = async (id, data) => {
    try {
        const doctor = Doctor.findByIdAndUpdate(id, data, { returnDocument: "after", runValidators: true });

        if (!doctor) {
            throw new AppError("No Doctor found to update", 404);
        }

        return doctor;
    } catch (error) {
        if (error.code === 11000) {
            throw new AppError("Doctor email aleady exists", 409);
        }

        throw error;
    }
}

const deleteDoctor = async (id) => {
    const doctor = await Doctor.findById(id);

    if (!doctor) {
        throw new AppError("No Doctor found to Delete!", 404);
    }

    const patientCount = await Patient.countDocuments({ doctor: id });

    if (patientCount > 0) {
        throw new AppError("Cannot delete doctor because patients are assigned to this doctor", 409);
    }

    await Doctor.findByIdAndDelete(id);

    return doctor;
}



module.exports = {
    escapeRegex,
    createDoctor,
    getDoctors,
    getDoctorById,
    updateDoctor,
    deleteDoctor
}