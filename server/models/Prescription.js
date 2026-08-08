const mongoose = require("mongoose");

const PrescriptionSchema = new mongoose.Schema(
  {
    patientName: String,
    age: String,
    gender: String,
    bloodGroup: String,
    weight: String,
    bp: String,
    temperature: String,

    chiefComplaint: String,
    diagnosis: String,
    advice: String,

    doctorName: String,

    medicines: [
      {
        medicine: String,
        morning: String,
        afternoon: String,
        evening: String,
        night: String,
        days: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Prescription",
  PrescriptionSchema
);