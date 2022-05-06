const express = require("express");
const router = express.Router();

const {
  getSprintIssues,
  createSprint,
  getActiveSprint,
} = require("../controllers/sprint");

router.get("/", getSprintIssues);
router.get("/active", getActiveSprint);
router.post("/", createSprint);

module.exports = router;
