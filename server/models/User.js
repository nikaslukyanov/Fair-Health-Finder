const mongoose = require("mongoose");

// User Schema
const userSchema = new mongoose.Schema({
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,  // Remove whitespace
      validate: {
        validator: function(v) {
          return v != null && v.length > 0;
        },
        message: 'Username cannot be null or empty'
      }
    },
    password: {
      type: String,
      required: true
    },
    firstname: {
      type: String,
      required: true
    },
    lastname: {
      type: String,
      required: true
    },
    race: {
      type: String,
      required: true
    },
    hispanic: {
      type: Boolean,
      default: null
    },
    zipcode: {
      type: Number,
      required: true
    },
    insurance: {
      type: Boolean,
      default: null
    },
    gender: {
      type: String,
      default: null
    }
  
}, { collection: 'users', timestamps: true }); // Explicitly sets the collection name

// Create & export User model
const User = mongoose.model("User", userSchema);
module.exports = User;


