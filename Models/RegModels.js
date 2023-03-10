const mongoose = require("mongoose");
const { Schema } = mongoose;

const newUser = new Schema({
  firstName: {
    type: String,
    required: [true, "This field is required"],
    trim: true,
    maxlength: [20, "cannot be more than 20 characters"],
  },

  lastName: {
    type: String,
    required: [true, "This field is required"],
    trim: true,
    maxlength: [20, "cannot be more than 20 characters"],
  },

  positionTitle: {
    type: String,
    required: [true, "This field is required"],
    trim: true,
    maxlength: [100, "this value cannot exceed 100 characters"],
  },

  email: {
    type: String,
    required: [true, "This field is required"],
    trim: true,
    unique: true,
    dropDups: true
  },

  password: {
    type: String,
    required: [true, "This field is required"],
    trim: true,
  },

  superAdmin: { type: Boolean, default: false },
});

module.exports = mongoose.model("newUser", newUser);
