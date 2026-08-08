const Prescription = require("../models/Prescription");

// ==========================
// Save Prescription
// ==========================
const savePrescription = async (req, res) => {
  try {
    const prescription = new Prescription(req.body);

    await prescription.save();

    res.status(201).json({
      message: "Prescription saved successfully",
      prescription,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ==========================
// Get All Prescriptions
// ==========================
const getPrescriptions = async (req, res) => {
  try {
    const prescriptions = await Prescription.find().sort({
      createdAt: -1,
    });

    res.json(prescriptions);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ==========================
// Get One Prescription
// ==========================
const getPrescriptionById = async (req, res) => {
  try {
    const prescription = await Prescription.findById(req.params.id);

    if (!prescription) {
      return res.status(404).json({
        message: "Prescription not found",
      });
    }

    res.json(prescription);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ==========================
// Delete Prescription
// ==========================
const deletePrescription = async (req, res) => {
  try {
    await Prescription.findByIdAndDelete(req.params.id);

    res.json({
      message: "Prescription deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  savePrescription,
  getPrescriptions,
  getPrescriptionById,
  deletePrescription,
};