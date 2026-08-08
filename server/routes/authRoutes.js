const express = require("express");
const router = express.Router();

const { register, login } = require("../controllers/authController");

// Create a doctor account (no UI for this yet — call directly or use the seed script)
router.post("/register", register);

// Log in
router.post("/login", login);

module.exports = router;
