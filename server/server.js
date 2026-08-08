const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const diagnosisRoutes = require("./routes/diagnosisRoutes");
const medicineRoutes = require("./routes/medicineRoutes");
const prescriptionRoutes = require("./routes/prescriptionRoutes");
const authRoutes = require("./routes/authRoutes");
const requireAuth = require("./middleware/requireAuth");
const app = express();

app.use(cors());
app.use(express.json());

// Public
app.use("/api/auth", authRoutes);

// Protected — require a valid login token
app.use("/api/medicines", requireAuth, medicineRoutes);
app.use("/api/diagnoses", requireAuth, diagnosisRoutes);
app.use("/api/prescriptions", requireAuth, prescriptionRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("prescription Backend Running...");
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");

    const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
  })
  .catch((err) => {
    console.log("❌ MongoDB Connection Error");
    console.log(err);
  });