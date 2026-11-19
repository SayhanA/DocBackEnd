const authService = require('../services/auth.service');
const { setAuthCookie, clearAuthCookie } = require('../utils/cookie.util')

const login = async (req, res, next) => {

    try {
        const { email, password } = req.body;

        const result = await authService.login(email, password);

        setAuthCookie(res, result.token);

        res.status(200).json({
            success: true,
            message: "Login Successfull",
            user: result.user
        });
        
    } catch (error) {
        if (error.message === 'Invalid email or password') {
            return res.status(401).json({
                success: false,
                message: error.message
            }); 
        };

        next(error);
    }
};

const logout = (req, res) => {
    clearAuthCookie(res);

    res.status(200).json({
        success: true,
        message: "Logout Successfull"
    });
};

const getMe = (req, res) => {
    res.status(200).json({
        success: true,
        user: req.user,
    });
};

module.exports = {
    login,
    logout,
    getMe
}