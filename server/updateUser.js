// Script to update an existing doctor's login credentials.
//
// Change password only:
//   node updateUser.js <current-username> --password <new-password>
//
// Change username only:
//   node updateUser.js <current-username> --username <new-username>
//
// Change both:
//   node updateUser.js <current-username> --username <new-username> --password <new-password>
//
// Example:
//   node updateUser.js drsharma --password newpass456

require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");

async function run() {
  const args = process.argv.slice(2);
  const currentUsername = args[0];

  if (!currentUsername) {
    console.log(
      "Usage: node updateUser.js <current-username> [--username <new-username>] [--password <new-password>]"
    );
    process.exit(1);
  }

  const usernameFlagIndex = args.indexOf("--username");
  const passwordFlagIndex = args.indexOf("--password");

  const newUsername =
    usernameFlagIndex !== -1 ? args[usernameFlagIndex + 1] : null;
  const newPassword =
    passwordFlagIndex !== -1 ? args[passwordFlagIndex + 1] : null;

  if (!newUsername && !newPassword) {
    console.log("Nothing to update. Provide --username and/or --password.");
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected to MongoDB.");

  const user = await User.findOne({
    username: currentUsername.trim().toLowerCase(),
  });

  if (!user) {
    console.log(`No user found with username "${currentUsername}".`);
    process.exit(1);
  }

  if (newUsername) {
    user.username = newUsername.trim().toLowerCase();
  }

  if (newPassword) {
    user.password = await bcrypt.hash(newPassword, 10);
  }

  await user.save();

  console.log("✅ User updated successfully.");
  console.log(`   Username: ${user.username}`);
  process.exit(0);
}

run().catch((err) => {
  console.error("❌ Failed to update user:", err.message);
  process.exit(1);
});
