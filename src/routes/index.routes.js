const express = require("express");

const router = express.Router();

router.get("/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Doctor Tracking API is healthy",
        timestamp: new Date().toISOString()
    });
});

router.use("/auth", require("./auth.routes"));

module.exports = router;