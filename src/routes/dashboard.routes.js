const express = require("express");
const { protect } = require("../middlewares/auth.middleware");
const { getDashboardStats } = require("../controllers/dashboard.controller");

const router = express.Router();

router.get("/", protect, getDashboardStats);

module.exports = router;