const express = require("express");
const router = express.Router();

const {
  savePrescription,
  getPrescriptions,
  getPrescriptionById,
  deletePrescription,
} = require("../controllers/prescriptionController");

// Save Prescription
router.post("/", savePrescription);

// Get All Prescriptions
router.get("/", getPrescriptions);

// Get One Prescription
router.get("/:id", getPrescriptionById);

// Delete Prescription
router.delete("/:id", deletePrescription);

module.exports = router;