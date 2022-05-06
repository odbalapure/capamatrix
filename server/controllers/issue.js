const Issue = require("../models/Issue");
const Sprint = require("../models/Sprint");

/**
 * @desc Get issues assigned to an employee
 * @param {*} req
 * @param {*} res
 * @method GET
 * @returns
 */
const getAssignedIssues = async (req, res) => {
  try {
    const issues = await Issue.find({ assignee: req.params.id });
    console.log(issues);
    return res.status(201).json({ length: issues.length, issues });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Failed to fetch tasks of an employee!" });
  }
};

/**
 * @desc Create an issue
 * @param {*} req
 * @param {*} res
 * @method POST
 * @returns
 */
const createIssue = async (req, res) => {
  const issues = await Issue.find();

  // Create issue id
  if (issues.length == 0) {
    req.body.issueId = "TT-1";
  } else {
    const issue = await Issue.findOne({}, {}, { sort: { createdAt: -1 } });

    const issueId = issue.issueId;
    let num = parseInt(issueId.split("-")[1]);
    num += 1;
    req.body.issueId = "TT-" + num;
  }

  try {
    // Edge case for front end
    if (req.body.assignee === "Select Assignee") {
      req.body.assignee = "";
    }

    if (req.body.sprint === "Select Sprint") {
      req.body.sprint = "";
    }

    // Create the issue
    const issue = await Issue.create(req.body);

    // Add the issue to a sprint if sprint is mentioned while creating the ticket
    if (req.body.sprint !== "") {
      console.log("Provided sprint id!");
      const sprint = await Sprint.findOne({ name: req.body.sprint });

      Sprint.findOneAndUpdate(
        { name: sprint.name },
        { $addToSet: { tasks: issue._id } },
        { safe: true, upsert: true, new: true },
        function (err, model) {
          if (err) {
            console.log("ERROR: ", err);
          } else {
            console.log("Sprint updated!");
          }
        }
      );
    } else {
      console.log("Sprint id not provided!");
    }

    return res.status(201).json({ msg: "Issue created successfully!", issue });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Issue couldn't be created, something went wrong!", issue });
  }
};

/**
 * @desc Get an issue
 * @param {*} req
 * @param {*} res
 * @method GET
 * @returns
 */
const getAnIssue = async (req, res) => {
  try {
    const issue = await Issue.findOne({ _id: req.params.id });
    return res.status(200).json({ issue });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Issue couldn't be fetched, something went wrong!" });
  }
};

/**
 * @desc Get all backlogs
 * @param {*} req
 * @param {*} res
 * @method GET
 * @returns
 */
const getAllBacklogs = async (req, res) => {
  try {
    const backlogs = await Issue.find({ sprint: "" });
    return res.status(200).json({ length: backlogs.length, backlogs });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Issue couldn't be fetched, something went wrong!" });
  }
};

/**
 * @desc Add a comment on an issue
 * @param {*} req
 * @param {*} res
 * @method PATCH
 * @returns
 */
const addComment = async (req, res) => {
  try {
    await Issue.findOneAndUpdate(
      { _id: req.params.id },
      { $addToSet: { comments: req.body } },
      { safe: true, upsert: true, new: true },
      function (err) {
        if (err) {
          console.log("Error while adding comment: ", err);
        } else {
          console.log("Comment section updated!");
        }
      }
    );

    return res.status(203).json({ msg: "Comment section updated!" });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Issue couldn't be fetched, something went wrong!" });
  }
};

/**
 * @desc Change status of an issue
 * @param {*} req
 * @param {*} res
 * @method PATCH
 */
const changeStatus = async (req, res) => {
  try {
    if (req.body.status === "Select Status") {
      return;
    }

    await Issue.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(203).json({ msg: "Status changed!" });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Something went wrong while changing status..." });
  }
};

/**
 * @desc Edit issue details
 * @param {*} req
 * @param {*} res
 * @method PATCH
 */
const changeIssueDetails = async (req, res) => {
  try {
    await Issue.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
      runValidators: true,
    });

    return res.status(203).json({ msg: "Issue details updated!" });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Something went wrong while changing issue details..." });
  }
};

/**
 * @desc Change assignee of an issue
 * @param {*} req
 * @param {*} res
 * @method PATCH
 */
const changeAssignee = async (req, res) => {
  try {
    if (req.body.status === "Select Status") {
      return;
    }

    await Issue.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(203).json({ msg: "Assignee changed!" });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Something went wrong while changing assingee..." });
  }
};

/**
 * @desc Change sprint of an issue
 * @param {*} req
 * @param {*} res
 * @method PATCH
 */
const changeSprint = async (req, res) => {
  if (req.body.oldSprint === req.body.newSprint) {
    return res.status(203).json({ msg: "Choose a different Sprint!" });
  }

  console.log("Old sprint: ", req.body.oldSprint);
  console.log("New sprint: ", req.body.newSprint);

  await Issue.findOneAndUpdate(
    { _id: req.params.id },
    { sprint: req.body.newSprint },
    {
      new: true,
      runValidators: true,
    }
  );

  // Remove the task from the sprint
  console.log(`Remove task ${req.params.id} from ${req.body.oldSprint}`);

  await Sprint.findOneAndUpdate(
    { name: req.body.oldSprint },
    { $pull: { tasks: req.params.id } },
    { upsert: false },
    function (err) {
      if (err) {
        console.log("ERROR: ", err);
      } else {
        console.log("Sprint updated!");
      }
    }
  );

  // Add the task to the sprint
  await Sprint.findOneAndUpdate(
    { name: req.body.newSprint },
    { $addToSet: { tasks: req.params.id } },
    { safe: true, upsert: true, new: true },
    function (err) {
      if (err) {
        console.log("Error while changing sprint: ", err);
      } else {
        console.log("Sprint changed!");
      }
    }
  );

  return res.status(203).json({ msg: "Sprint changed!" });
};

module.exports = {
  createIssue,
  getAnIssue,
  getAllBacklogs,
  addComment,
  changeStatus,
  changeAssignee,
  changeSprint,
  changeIssueDetails,
  getAssignedIssues,
};
