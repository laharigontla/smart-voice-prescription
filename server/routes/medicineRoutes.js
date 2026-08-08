const express = require("express");
const router = express.Router();

const {
  addMedicine,
  getMedicines,
  searchMedicine,
  deleteMedicine,
  updateMedicine,
} = require("../controllers/medicineController");

router.post("/", addMedicine);

router.get("/", getMedicines);

router.get("/search/:name", searchMedicine);

router.put("/:id", updateMedicine);

router.delete("/:id", deleteMedicine);

module.exports = router;