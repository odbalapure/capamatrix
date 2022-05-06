import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Backlog.css";

const url = process.env.REACT_APP_API_URL;

function Backlog() {
  const [sprints, setSprints] = useState([]);
  const [backlogs, setBacklogs] = useState([]);

  const navigate = useNavigate();
  const navigateToIssue = (id, issue) => {
    navigate(`/issue/${id}`, { state: issue }, { replace: true });
  };

  /**
   * @desc Get all tasks in a sprint
   */
  const getTasks = async () => {
    try {
      const sprintResponse = await axios.get(`${url}/sprints`);
      setSprints(sprintResponse.data.sprints);
    } catch (error) {}
  };

  /**
   * @desc Get all backlogs
   */
  const getBacklogs = async () => {
    try {
      const backlogResponse = await axios.get(`${url}/issues`);
      setBacklogs(backlogResponse.data.backlogs);
    } catch (error) {}
  };

  useEffect(() => {
    getTasks();
    getBacklogs();
  }, []);

  return (
    <>
      <div className="container" style={{ marginTop: "5rem" }}>
        {sprints.map((sprint) => {
          if (sprint.tasks.length < 1) {
            return <div key={sprint.name}></div>;
          }

          return (
            <div className="mb-3" key={sprint.name}>
              <div className="fw-bold">{sprint.name}</div>
              <div>
                <span className="fw-bold">Timeline</span>:{" "}
                {sprint.start.slice(0, 10)} to {sprint.end.slice(0, 10)}
              </div>
              {sprint.tasks.map((task) => {
                if (task.sprint.includes("SPRT")) {
                  return (
                    <div className="card" key={task._id}>
                      <div className="p-2 d-flex  align-items-center justify-content-between">
                        <div className="d-flex align-items-center">
                          {task.type === "Bug" ? (
                            <i
                              style={{ color: "red", fontSize: "1.2rem" }}
                              className="bi bi-bug-fill"
                            ></i>
                          ) : null}
                          {task.type === "Story" ? (
                            <i
                              style={{ color: "green", fontSize: "1.2rem" }}
                              className="bi bi-ticket-fill"
                            ></i>
                          ) : null}
                          {task.type === "Task" ? (
                            <i
                              style={{
                                color: "dodgerblue",
                                fontSize: "1.2rem",
                              }}
                              className="bi bi-info-square-fill"
                            ></i>
                          ) : null}
                          &nbsp;&nbsp;
                          <div
                            onClick={() => navigateToIssue(task._id, task)}
                            style={{ cursor: "pointer" }}
                            className="issue-title-hover"
                          >
                            {task.title}
                          </div>
                        </div>
                        <div className="d-flex align-items-center">
                          <div
                            style={{
                              textAlign: "center",
                              color: "white",
                              backgroundColor: "darkblue",
                              borderRadius: "50%",
                              width: "1.8rem",
                              padding: "0.1rem",
                              fontWeight: "400",
                              cursor: "pointer",
                            }}
                            data-bs-toggle="tooltip"
                            data-bs-placement="left"
                            title={task.assignee}
                          >
                            {task.assignee ? task.assignee.charAt(0) : "?"}
                          </div>
                          &nbsp;&nbsp;
                          <div
                            className="fw-bold"
                            style={{
                              backgroundColor: "lightgray",
                              borderRadius: "0.5rem",
                              padding: "0.2rem",
                            }}
                          >
                            {task.issueId}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }

                return null;
              })}
            </div>
          );
        })}
      </div>
      <div className="mt-5 container">
        <div className="d-flex justify-content-between mb-2">
          <div>
            <span className="fw-bold">Backlogs</span> •{" "}
            <span className="text-muted">{backlogs.length} Issue(s)</span>
          </div>
          <div
            className="btn btn-primary"
            style={{ fontSize: "0.9rem", backgroundColor: "#0040ad" }}
          >
            <Link
              to="/create-sprint"
              style={{ textDecoration: "none", color: "#fff" }}
            >
              Create Sprint
            </Link>
          </div>
        </div>
        {backlogs.map((backlog) => {
          return (
            <div className="card" key={backlog._id}>
              <div className="p-2 d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  {backlog.type === "Bug" ? (
                    <i
                      style={{ color: "red", fontSize: "1.5rem" }}
                      className="bi bi-bug-fill"
                    ></i>
                  ) : null}
                  {backlog.type === "Story" ? (
                    <i
                      style={{ color: "green", fontSize: "1.2rem" }}
                      className="bi bi-ticket-fill"
                    ></i>
                  ) : null}
                  {backlog.type === "Task" ? (
                    <i
                      style={{ color: "dodgerblue", fontSize: "1.2rem" }}
                      className="bi bi-info-square-fill"
                    ></i>
                  ) : null}
                  &nbsp;&nbsp;
                  <div
                    className="issue-title-hover"
                    onClick={() => navigateToIssue(backlog._id, backlog)}
                    style={{ cursor: "pointer" }}
                  >
                    {backlog.title}
                  </div>
                </div>
                <div className="d-flex">
                  <div
                    style={{
                      textAlign: "center",
                      color: "white",
                      backgroundColor: "darkblue",
                      borderRadius: "50%",
                      width: "1.8rem",
                      padding: "0.1rem",
                      fontWeight: "400",
                      cursor: "pointer",
                    }}
                    data-bs-toggle="tooltip"
                    data-bs-placement="left"
                    title={backlog.assignee ? backlog.assignee.charAt(0) : "No Assignee"}
                  >
                    {backlog.assignee ? backlog.assignee.charAt(0) : "?"}
                  </div>
                  &nbsp;&nbsp;
                  <div
                    className="fw-bold"
                    style={{
                      backgroundColor: "lightgray",
                      borderRadius: "0.5rem",
                      padding: "0.2rem",
                    }}
                  >
                    {backlog.issueId}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Backlog;
