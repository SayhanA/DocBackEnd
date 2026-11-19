const User = require("../models/user.model");
const { verifyToken } = require("../utils/token.util");

const protect = async (req, res, next) => {
    try {
        const token = req.cookies?.doctor_tracking_token;

        if(!token) {
            return res.status(401).json({
                success: false,
                message: "Authentication required"
            });
        }

        const decoded = verifyToken(token);

        const user = await User.findById(decoded.id).select("name email role");

        if(!user) {
            return res.status(401).json({
                success: false,
                message: "User not found",
            });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });
    }
};

module.exports = {
    protect
}