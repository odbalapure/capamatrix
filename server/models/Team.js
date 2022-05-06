const mongoose = require("mongoose");

const TeamSchema = new mongoose.Schema({
  name: String,
  members: [
    {
      name: String,
      image: String,
      email: String,
      designation: String,
    },
  ],
});

module.exports = mongoose.model("Team", TeamSchema);
