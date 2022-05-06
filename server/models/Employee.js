const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EmployeeSchema = new mongoose.Schema({
  name: String,
  image: String,
  email: String,
  team: {
    type: String,
    default: "",
  },
  designation: String,
  tasks: [{ type: Schema.Types.ObjectId, ref: "Issue" }],
});

module.exports = mongoose.model("Employee", EmployeeSchema);
