const express = require("express");
const validate = require("../middlewares/validate.middleware");
const { patientSchema } = require("../validators/patient.validator");
const { createPatient } = require("../controllers/patient.controller");

const router = express.Router();

router.post("/", validate(patientSchema), createPatient);


module.exports = router;