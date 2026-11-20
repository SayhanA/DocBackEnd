
const dashboardService = require("../services/dashboard.service")

const getDashboardStats = async (req, res, next) => {
    try {
        const dashboard = await dashboardService.getDashboardStats();

        res.status(200).json({
            success: true,
            ...dashboard,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getDashboardStats,
};
