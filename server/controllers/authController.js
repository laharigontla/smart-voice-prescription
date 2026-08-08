const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

// ==========================
// Register (used to create doctor accounts)
// ==========================
const register = async (req, res) => {
  try {
    const { username, password, doctorName } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        message: "Username and password are required.",
      });
    }

    const existing = await User.findOne({
      username: username.trim().toLowerCase(),
    });

    if (existing) {
      return res.status(409).json({
        message: "That username is already taken.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username: username.trim().toLowerCase(),
      password: hashedPassword,
      doctorName: doctorName || "",
    });

    await user.save();

    const token = generateToken(user);

    res.status(201).json({
      message: "Account created successfully.",
      token,
      user: {
        id: user._id,
        username: user.username,
        doctorName: user.doctorName,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ==========================
// Login
// ==========================
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        message: "Username and password are required.",
      });
    }

    const user = await User.findOne({
      username: username.trim().toLowerCase(),
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid username or password.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid username or password.",
      });
    }

    const token = generateToken(user);

    res.json({
      message: "Login successful.",
      token,
      user: {
        id: user._id,
        username: user.username,
        doctorName: user.doctorName,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  register,
  login,
};
