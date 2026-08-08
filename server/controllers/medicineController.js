const Medicine = require("../models/Medicine");

// Add Medicine
const addMedicine = async (req, res) => {
  try {
    const { name, molecule, type, manufacturer } = req.body;

    const existingMedicine = await Medicine.findOne({ name });

    if (existingMedicine) {
      return res.status(200).json({
        message: "Medicine already exists",
        medicine: existingMedicine,
      });
    }

    const medicine = new Medicine({
      name,
      molecule,
      type,
      manufacturer,
    });

    await medicine.save();

    res.status(201).json({
      message: "Medicine Added Successfully",
      medicine,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Medicines
const getMedicines = async (req, res) => {
  try {
    const medicines = await Medicine.find().sort({ name: 1 });

    res.json(medicines);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Search Medicine by Name
const searchMedicine = async (req, res) => {
  try {
    const medicine = await Medicine.findOne({
      name: new RegExp("^" + req.params.name + "$", "i"),
    });

    if (!medicine) {
      return res.json(null);
    }

    res.json(medicine);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Medicine
const updateMedicine = async (req, res) => {
  try {
    const { name, molecule, type, manufacturer } = req.body;

    const medicine = await Medicine.findByIdAndUpdate(
      req.params.id,
      {
        name,
        molecule,
        type,
        manufacturer,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!medicine) {
      return res.status(404).json({
        message: "Medicine not found",
      });
    }

    res.json({
      message: "Medicine Updated Successfully",
      medicine,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Medicine
const deleteMedicine = async (req, res) => {
  try {
    await Medicine.findByIdAndDelete(req.params.id);

    res.json({
      message: "Medicine Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addMedicine,
  getMedicines,
  searchMedicine,
  updateMedicine,
  deleteMedicine,
};