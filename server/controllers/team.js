const Team = require("../models/Team");

/**
 * @desc Get all teams
 * @param {*} req
 * @param {*} res
 * @returns
 */
const getAllTeams = async (req, res) => {
  try {
    const teams = await Team.find();
    return res.status(200).json({ length: teams.length, teams });
  } catch (err) {
    return res.status(500).json({
      msg: "Failed to fetch teams, try some time later...",
    });
  }
};

/**
 * @desc Add team member
 * @param {*} req
 * @param {*} res
 * @returns
 */
const addTeamMember = async (req, res) => {
  try {
    Team.findOneAndUpdate(
      { _id: req.params.id },
      { $addToSet: { members: req.body } },
      { safe: true, upsert: true, new: true },
      function (err, model) {
        if (err) {
          console.log("Failed to add member: ", err);
        }
      }
    );

    return res.status(200).json({ msg: "Team member added" });
  } catch (err) {
    return res.status(500).json({
      msg: "Failed to fetch teams, try some time later...",
    });
  }
};

module.exports = {
  getAllTeams,
  addTeamMember,
};
