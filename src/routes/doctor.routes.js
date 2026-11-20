const express = require("express");
const { protect } = require("../middlewares/auth.middleware");
const validate = require("../middlewares/validate.middleware");
const { doctorSchema, updateDoctorSchema, doctorQuerySchema } = require("../validators/doctor.validator");
const { createDoctor, getDoctors, getDoctorById } = require("../controllers/doctor.controller");

const router = express.Router();

router.use(protect);

router.post("/", validate(doctorSchema), createDoctor);
router.get("/", validate(doctorQuerySchema, "query"), getDoctors);
router.get("/:id", getDoctorById);


module.exports = router;

