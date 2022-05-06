const mongoose = require("mongoose");

const IssueSchema = new mongoose.Schema({
  type: String,
  title: String,
  description: String,
  reporter: String,
  priority: String,
  assignee: {
    type: String,
    default: "",
  },
  sprint: {
    type: String,
    default: "",
  },
  component: String,
  issueId: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    default: "To Do",
  },
  comments: [
    {
      author: String,
      comment: String,
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

module.exports = mongoose.model("Issue", IssueSchema);
