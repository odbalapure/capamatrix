const Sprint = require("../models/Sprint");
const Issue = require("../models/Issue");

/**
 * @desc Get sprint along with all the tasks
 * @method GET
 * @returns
 */
const getActiveSprint = async (req, res) => {
  try {
    const sprint = await Sprint.findOne({ active: true });
    console.log(sprint);

    const activeSprintIssues = [];
    const sprintIssueMapper = {};

    for (let task of sprint.tasks) {
      const issue = await Issue.findOne({ _id: task });
      activeSprintIssues.push(issue);
    }

    sprintIssueMapper["name"] = sprint.name;
    sprintIssueMapper["goal"] = sprint.goal;
    sprintIssueMapper["start"] = sprint.start;
    sprintIssueMapper["end"] = sprint.end;
    sprintIssueMapper["createdAt"] = sprint.createdAt;
    sprintIssueMapper["issues"] = activeSprintIssues;

    return res.status(200).json({ ...sprintIssueMapper });
  } catch (error) {
    return res.status(500).json({ msg: "Something went wrong..." });
  }
};

/**
 * @desc Get sprint along with all the tasks
 * @method GET
 * @returns
 */
const getSprintIssues = async (req, res) => {
  try {
    const sprints = await Sprint.find();
    const sprintMapper = [];

    for (let sprint of sprints) {
      let sprintObj = {};
      let issueArr = [];
      for (let task of sprint.tasks) {
        const issue = await Issue.findOne({ _id: task });
        issueArr.push(issue);
      }

      sprintObj["name"] = sprint.name;
      sprintObj["start"] = sprint.start;
      sprintObj["end"] = sprint.end;
      sprintObj["goal"] = sprint.goal;
      sprintObj["tasks"] = issueArr;
      sprintMapper.push(sprintObj);
    }

    return res
      .status(200)
      .json({ length: sprintMapper.length, sprints: sprintMapper });
  } catch (error) {
    return res.status(500).json({
      msg: "Failed to get all the sprints, something went wrong!",
    });
  }
};

/**
 * @desc Create a sprint
 * @method POST
 * @returns
 */
const createSprint = async (req, res) => {
  console.log("Creating a sprint...");
  try {
    // Find last old sprint name
    const oldSprint = await Sprint.findOne({}, {}, { sort: { createdAt: -1 } });

    if (oldSprint === null) {
      req.body.name = "SPRT-1";
    } else {
      const oldSprintName = oldSprint.name;
      let num = parseInt(oldSprintName.split("-")[1]);
      num += 1;
      req.body.name = "SPRT-" + num;
    }

    // Create sprint
    const newSprint = await Sprint.create(req.body);
    console.log(newSprint);
    return res
      .status(200)
      .json({ msg: "Sprint created successfully", newSprint });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Failed to create sprint" });
  }
};

module.exports = { getSprintIssues, createSprint, getActiveSprint };
