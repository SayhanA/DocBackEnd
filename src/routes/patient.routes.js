const express = require("express");
const validate = require("../middlewares/validate.middleware");
const { patientSchema, updatePatientSchema, patientQuerySchema } = require("../validators/patient.validator");
const { createPatient, getPatients, getPatientById, updatePatient, deletePatient } = require("../controllers/patient.controller");

const router = express.Router();

router.post("/", validate(patientSchema), createPatient);
router.get("/", validate(patientQuerySchema, "query"), getPatients);
router.get("/:id", getPatientById);
router.patch("/:id", validate(updatePatientSchema), updatePatient);
router.delete("/:id", deletePatient);


module.exports = router;