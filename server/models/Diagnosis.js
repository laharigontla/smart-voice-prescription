const mongoose = require("mongoose");

const diagnosisSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    medicines: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Medicine",
      },
    ],

    symptoms: [
      {
        type: String,
      },
    ],

    labTests: [
      {
        type: String,
      },
    ],

    advice: [
      {
        type: String,
      },
    ],

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("Diagnosis", diagnosisSchema);