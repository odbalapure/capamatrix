const mongoose = require("mongoose");

const SprintSchema = new mongoose.Schema({
  name: String,
  goal: String,
  active: {
    type: Boolean,
    default: false,
  },
  start: Date,
  end: Date,
  tasks: [mongoose.Types.ObjectId],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Sprint", SprintSchema);
