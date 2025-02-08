const mongoose = require("mongoose");

// User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
}, { collection: 'users' });  // This explicitly sets the collection name

// Create & export User model
const User = mongoose.model("User", userSchema);
module.exports = User;

