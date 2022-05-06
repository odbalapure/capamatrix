const express = require("express");
const router = express.Router();

const { getAllTeams, addTeamMember } = require("../controllers/team");

router.route("/").get(getAllTeams);
router.route("/:id").patch(addTeamMember);

module.exports = router;
