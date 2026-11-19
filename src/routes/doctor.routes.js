const express = require("express");
const { protect } = require("../middlewares/auth.middleware");
const validate = require("../middlewares/validate.middleware");
const { doctorSchema } = require("../validators/doctor.validator");
const { createDoctor } = require("../controllers/doctor.controller");

const router = express.Router();

router.use(protect);

router.post("/", validate(doctorSchema), createDoctor);


module.exports = router;

