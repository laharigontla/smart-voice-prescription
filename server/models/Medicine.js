const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    molecule: {
      type: String,
      default: "",
    },

    type: {
      type: String,
      enum: [
        "Tablet",
        "Capsule",
        "Syrup",
        "Injection",
        "Drops",
        "Cream",
        "Ointment",
        "Inhaler",
        "Other",
      ],
      default: "Tablet",
    },

    manufacturer: {
      type: String,
      default: "",
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("Medicine", medicineSchema);