const express = require("express");
const router = express.Router();

const {
  createIssue,
  getAnIssue,
  getAllBacklogs,
  addComment,
  changeStatus,
  changeAssignee,
  changeSprint,
  changeIssueDetails,
  getAssignedIssues,
} = require("../controllers/issue");

router.post("/", createIssue);
router.get("/:id", getAnIssue);
router.get("/assigned/:id", getAssignedIssues);
router.get("/", getAllBacklogs);
router.patch("/:id", addComment);
router.patch("/status/:id", changeStatus);
router.patch("/issue/:id", changeIssueDetails);
router.patch("/assignee/:id", changeAssignee);
router.patch("/sprint/:id", changeSprint);

module.exports = router;
