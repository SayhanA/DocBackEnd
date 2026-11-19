const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
};

const setAuthCookie = (res, token) => {
    res.cookie("doctor_tracking_token", token, {
        ...cookieOptions,
        maxAge: 24 * 60 * 60 * 1000, // 1 day
    });
};

const clearAuthCookie = (res) => {
    res.clearCookie("doctor_tracking_token", cookieOptions);
};

module.exports = {
    setAuthCookie,
    clearAuthCookie,
}