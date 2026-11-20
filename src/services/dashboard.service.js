const Doctor = require("../models/doctor.model")
const Patient = require("../models/patient.model")

const getDashboardStats = async () => {
    const [totalDoctors, totalPatients] = await Promise.all([
        Doctor.countDocuments(),
        Patient.countDocuments(),
    ]);

    const patientsPerDoctor = await Doctor.aggregate([
        {
            $lookup: {
                from: "patients",
                localField: "_id",
                foreignField: "doctor",
                as: "patients",
            },
        },
        {
            $project: {
                name: 1,
                specialization: 1,
                hospital: 1,
                patientCount: {
                    $size: "$patients",
                },
            },
        },
        {
            $sort: {
                patientCount: -1,
            },
        },
    ]);

    const specializationStats = await Doctor.aggregate([
        {
            $group: {
                _id: "$specialization",
                count: {
                    $sum: 1,
                },
            },
        },
        {
            $sort: {
                count: -1,
            },
        },
    ]);

    const now = new Date();

    const startDate = new Date(
        now.getFullYear(),
        now.getMonth() - 5,
        1
    );

    const patientTrend = await Patient.aggregate([
        {
            $match: {
                createdAt: {
                    $gte: startDate,
                    $lte: now,
                },
            },
        },
        {
            $group: {
                _id: {
                    year: {
                        $year: "$createdAt",
                    },
                    month: {
                        $month: "$createdAt",
                    },
                },
                count: {
                    $sum: 1,
                },
            },
        },
        {
            $sort: {
                "_id.year": 1,
                "_id.month": 1,
            },
        },
    ]);

    const recentPatients = await Patient.find()
        .populate("doctor", "name specialization")
        .sort({ createdAt: -1 })
        .limit(5)
        .lean();

    const trendMap = new Map(
        patientTrend.map((item) => [
            `${item._id.year}-${item._id.month}`,
            item.count,
        ])
    );

    const monthlyTrend = [];

    for (let i = 5; i >= 0; i--) {
        const date = new Date(
            now.getFullYear(),
            now.getMonth() - i,
            1
        );

        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const key = `${year}-${month}`;

        monthlyTrend.push({
            year,
            month,
            count: trendMap.get(key) || 0,
        });
    }

    return {
        stats: {
            totalDoctors,
            totalPatients,
        },
        patientsPerDoctor,
        specializationStats,
        patientTrend: monthlyTrend,
        recentPatients,
    };
};

module.exports = {
    getDashboardStats,
};