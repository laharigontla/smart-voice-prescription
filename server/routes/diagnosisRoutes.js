const express = require("express");
const router = express.Router();

const {
  addDiagnosis,
  getDiagnoses,
  linkMedicines,
  getDiagnosisByName,
  getMedicineSuggestions,
} = require("../controllers/diagnosisController");

router.post("/", addDiagnosis);

router.get("/", getDiagnoses);

router.get("/name/:name", getDiagnosisByName);

router.post("/suggestions", getMedicineSuggestions);

router.put("/:id/medicines", linkMedicines);

module.exports = router;