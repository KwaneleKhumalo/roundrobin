const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
  },

  password: {
    type: String,
    required: [true, "This field is required"],
    trim: true,
  },

  superAdmin: { type: Boolean, default: false },
});

//hash Password
newUser.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//Generate Token
newUser.methods.createJWT = function () {
  return jwt.sign(
    {
      userID: this._id,
      name: this.firstName,
    },
    "jwtSecrete",
    {
      expiresIn: "30d",
    }
  );
};

newUser.methods.comparePasswords = async function (userPassword) {
  const isMatched = await bcrypt.compare(userPassword, this.password)
  return isMatched
}
module.exports = mongoose.model("newUser", newUser);
