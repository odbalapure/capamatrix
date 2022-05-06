const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
    minLength: 3,
    maxLength: 20,
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email address",
    ],
    // Eg: We try to register with an email already in use, we get an error message
    // NOTE: Not a validator checks if email ids are unique
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minLength: 6,
  },
  activated: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    default: "USER",
  },
});

// Instead on encoding the password in the controller we can encode it there
// We are telling mongoose to do the encryption before saving the user object to the database
/* NOTE: This is a mongoose middleware */
UserSchema.pre("save", async function () {
  // 10 is default value
  // Increase the value for stronger encoding but it requires more processing
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.getName = function () {
  return this.name;
};

// Create JWT token on registration
UserSchema.methods.createJwt = function () {
  return jwt.sign(
    { userId: this._id, email: this.email },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_TTL,
    }
  );
};

UserSchema.methods.comparePassword = async function (candidatePassword) {
  // compare() is a built-in method - returns a boolean
  const isMatching = await bcrypt.compare(candidatePassword, this.password);
  return isMatching;
};

module.exports = mongoose.model("User", UserSchema);
