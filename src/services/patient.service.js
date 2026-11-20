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

const getPatients = async (filters) => {
  const {
    page,
    limit,
    search,
    condition,
    doctor,
    startDate,
    endDate,
    sortBy,
    sortOrder,
  } = filters;

  const query = {};

  if (search) {
    query.name = {
      $regex: escapeRegex(search),
      $options: "i",
    };
  }

  if (condition) {
    query.condition = {
      $regex: escapeRegex(condition),
      $options: "i",
    };
  }

  if (doctor) {
    query.doctor = doctor;
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
      query.createdAt.$lt = end;
    }
  }

  const skip = (page - 1) * limit;

  const sort = {
    [sortBy]: sortOrder === "asc" ? 1 : -1,
  };

  const [patients, total] = await Promise.all([
    Patient.find(query)
      .populate("doctor", "name specialization hospital")
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean(),

    Patient.countDocuments(query),
  ]);

  return {
    patients,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

const getPatientById = async (id) => {
  const patient = await Patient.findById(id).populate(
    "doctor",
    "name specialization hospital"
  );

  if (!patient) {
    throw new AppError("Patient not found", 404);
  }

  return patient;
};

const updatePatient = async (id, data) => {
  if (data.doctor) {
    await verifyDoctor(data.doctor);
  }

  const patient = await Patient.findByIdAndUpdate(
    id,
    data,
    {
      returnDocument: "after",
      runValidators: true,
    }
  ).populate("doctor", "name specialization hospital");

  if (!patient) {
    throw new AppError("Patient not found", 404);
  }

  return patient;
};

const deletePatient = async (id) => {
  const patient = await Patient.findByIdAndDelete(id);

  if (!patient) {
    throw new AppError("Patient not found", 404);
  }

  return patient;
};




module.exports = {
    escapeRegex,
    verifyDoctor,
    createPatient,
    getPatients,
    getPatientById,
    updatePatient,
    deletePatient
}