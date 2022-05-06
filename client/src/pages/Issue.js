import { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useGlobalContext } from "../context";

const url = process.env.REACT_APP_API_URL;

function Issue() {
  // Issue details
  const [issue, setIssue] = useState({});
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  // Get sprints and assignees
  const { sprints, assignees } = useGlobalContext();

  // Previous component state
  const location = useLocation();
  const issueId = location.state._id;

  // Login details
  const { userName } = useGlobalContext();

  // Messages
  const [warning, setWarning] = useState("");

  const navigate = useNavigate();
  const navigateToEditIssue = (issue) => {
    navigate(`/edit-issue`, { state: issue }, { replace: true });
  };

  /**
   * @desc Get single issue
   */
  const getIssue = useCallback(async () => {
    const issueResponse = await axios.get(`${url}/issues/${issueId}`);
    setIssue(issueResponse.data.issue);
    setComments(issueResponse.data.issue.comments);
  }, [issueId]);

  useEffect(() => {
    getIssue();
  }, [getIssue]);

  /**
   * @desc Add a comment in an issue
   */
  const addComment = async (issueId) => {
    try {
      if (comment === "") {
        return;
      }

      await axios.patch(`${url}/issues/${issueId}`, {
        author: userName,
        comment,
      });

      getIssue();
    } catch (error) {}
  };

  /**
   * @desc Change the status
   * @param {*} status
   */
  const changeStatus = async (status) => {
    if (issue.assignee === "") {
      setWarning("Assignment must be done before changing the status");
      setTimeout(() => setWarning(""), 3000);
      return;
    }

    try {
      await axios.patch(`${url}/issues/status/${issueId}`, { status });
      window.location.reload();
    } catch (error) {
      console.log("Failed to change status: ", error);
    }
  };

  /**
   * @desc Change the assignee
   * @param {*} status
   */
  const changeAssignee = async (assignee) => {
    try {
      await axios.patch(`${url}/issues/assignee/${issueId}`, { assignee });
      window.location.reload();
    } catch (error) {
      console.log("Failed to change assignee: ", error);
    }
  };

  /**
   * @desc Change the sprint
   * @param {*} status
   */
  const changeSprint = async (sprint) => {
    try {
      const response = await axios.patch(`${url}/issues/sprint/${issueId}`, {
        newSprint: sprint,
        oldSprint: issue.sprint,
      });

      console.log(response);
      window.location.reload();
    } catch (error) {
      console.log("Failed to change sprint: ", error);
    }
  };

  return (
    <div className="container" style={{ marginTop: "5rem" }}>
      <div className="row">
        {/* Details */}
        <div className="col-lg-7">
          <div className="fs-5" style={{ fontWeight: "600" }}>
            {issue.issueId} / {issue.type}
          </div>
          <div className="fs-4" style={{ fontWeight: "700" }}>
            {issue.title}
          </div>
          <div className="mt-3">
            <div className="fw-bold">Description</div>
            <div>{issue.description}</div>
          </div>
          <hr />
          <div>
            <div className="fw-bold text-muted">Comments</div>
            {comments.map((comment) => {
              return (
                <div
                  className="card p-3 mb-2"
                  key={comment.createdAt}
                  style={{ backgroundColor: "#dce9f7" }}
                >
                  <div>
                    <span className="fw-bold">{comment.author}</span> •{" "}
                    {comment.createdAt}
                  </div>
                  <div>{comment.comment}</div>
                </div>
              );
            })}
          </div>
          <div className="mt-3 mb-5">
            <textarea
              className="form-control"
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
            <button
              className="btn btn-dark mt-1"
              disabled={userName ? false : true}
              onClick={() => addComment(issueId)}
            >
              Add Comment
            </button>
          </div>
        </div>
        {/* Timeline and statue */}
        <div className="col-lg-5 mt-5">
          <div
            className="p-2"
            style={{
              border: "1px solid lightgray",
              width: "40%",
              textAlign: "center",
              color: "#fff",
              backgroundColor: "dodgerblue",
            }}
          >
            <span className="fw-bold">{issue.status} </span>
          </div>
          <div className="mt-2 p-3" style={{ border: "1px solid lightgray" }}>
            <div>
              <span className="fw-bold">Assignee : </span>&nbsp;&nbsp;
              {issue.assignee ? issue.assignee : "Not Assigned"}
            </div>
            <div>
              <span className="fw-bold">Change Assingee : </span> &nbsp;&nbsp;
              <select
                style={{ border: "1px solid lightgray", cursor: "pointer" }}
                onChange={(e) => changeAssignee(e.target.value)}
              >
                <option>Select Assignee</option>
                {assignees.map((assignee) => {
                  return (
                    <option value={assignee.name} key={assignee._id}>
                      {assignee.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div>
              <span className="fw-bold">Reporter : </span>&nbsp;&nbsp;
              {issue.reporter ? issue.reporter : "Not Ascsigned"}
            </div>
            <div>
              <span className="fw-bold">Created At : </span>&nbsp;&nbsp;
              {new Date(issue.createdAt).toString().slice(0, 15)}
            </div>
            <div>
              <span className="fw-bold">Sprint : </span>&nbsp;&nbsp;
              {issue.sprint ? issue.sprint : "Not Assigned"}
            </div>
            <div>
              <span className="fw-bold">Change Sprint: </span>&nbsp;&nbsp;
              <select
                style={{ border: "1px solid lightgray", cursor: "pointer" }}
                onChange={(e) => changeSprint(e.target.value)}
              >
                <option>Select Sprint</option>
                {sprints.map((sprint) => {
                  return <option key={sprint.name}>{sprint.name}</option>;
                })}
              </select>
            </div>
            <div>
              <span className="fw-bold">Change Status : </span>&nbsp;&nbsp;
              <select
                style={{ border: "1px solid lightgray", cursor: "pointer" }}
                onChange={(e) => changeStatus(e.target.value)}
              >
                <option>Select Status</option>
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Verify">Verify</option>
                <option value="Done">Done</option>
              </select>
            </div>
            <div className="d-grid gap-2 mt-4">
              <button
                className="btn btn-warning"
                type="button"
                onClick={() => navigateToEditIssue(issue)}
              >
                Edit Issue Details
              </button>
            </div>
            {warning ? (
              <p
                className="d-flex justify-content-center alert alert-danger m-3"
                role="alert"
              >
                {warning}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Issue;
