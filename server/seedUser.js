// One-time script to create a doctor login account.
//
// Usage:
//   node seedUser.js <username> <password> "<Doctor Display Name>"
//
// Example:
//   node seedUser.js drsharma mysecret123 "Dr. Sharma"

require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");

async function run() {
  const [, , username, password, doctorName] = process.argv;

  if (!username || !password) {
    console.log(
      'Usage: node seedUser.js <username> <password> "<Doctor Display Name>"'
    );
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected to MongoDB.");

  const existing = await User.findOne({
    username: username.trim(),
  });

  if (existing) {
    console.log(`A user named "${username}" already exists.`);
    process.exit(0);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    username: username.trim(),
    password: hashedPassword,
    doctorName: doctorName || "",
  });

  await user.save();

  console.log(`✅ User "${username}" created successfully.`);
  process.exit(0);
}

run().catch((err) => {
  console.error("❌ Failed to create user:", err.message);
  process.exit(1);
});
