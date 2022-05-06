import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const url = process.env.REACT_APP_API_URL;

function Board() {
  const [sprintDetails, setSprintDetails] = useState({});

  const navigate = useNavigate();
  const navigateToIssue = (id, issue) => {
    navigate(`/issue/${id}`, { state: issue }, { replace: true });
  };

  /**
   * @desc Get active sprint
   */
  async function getActiveSprint() {
    try {
      const activeSprintResponse = await axios.get(`${url}/sprints/active`);
      setSprintDetails(activeSprintResponse.data);
    } catch {
      console.log("Something went wrong...");
    }
  }

  useEffect(() => {
    getActiveSprint();
  }, []);

  return (
    <div className="container" style={{ marginTop: "5rem" }}>
      {sprintDetails !== undefined || sprintDetails !== null ? (
        <div>
          <div className="fs-2">{sprintDetails.name}</div>
          <div style={{ fontWeight: "500" }}>
            {new Date(sprintDetails?.start).toString().slice(0, 15)} to{" "}
            {new Date(sprintDetails?.start).toString().slice(0, 15)}
          </div>
        </div>
      ) : null}
      <div className="p-3">
        <div className="row">
          <div className="fs-5 col-lg-3">To Do</div>
          <div className="fs-5 col-lg-3">In Progress</div>
          <div className="fs-5 col-lg-3">Verify</div>
          <div className="fs-5 col-lg-3">Done</div>
        </div>
        <div>
          {sprintDetails.issues !== null || sprintDetails.issues !== undefined
            ? sprintDetails.issues?.map((issue) => {
                return (
                  <div key={issue._id}>
                    <div className="row">
                      <div
                        className="col-lg-3 d-flex"
                        style={{
                          backgroundColor: "rgba(0, 79, 135, 0.1)",
                          height: "8rem",
                          borderRight: "10px solid white",
                        }}
                      >
                        {issue.status === "To Do" ? (
                          <div
                            className="p-1 m-1 d-flex flex-column justify-content-between"
                            style={{
                              border: "1px solid lightgray",
                              borderRadius: "0.5rem",
                              overflow: "auto",
                              backgroundColor: "white",
                            }}
                          >
                            <div
                              onClick={() => navigateToIssue(issue._id, issue)}
                              className="issue-title-hover"
                            >
                              {issue.title}
                            </div>
                            <div className="d-flex align-items-end">
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
                              >
                                {issue.assignee.charAt(0)}
                              </div>
                              &nbsp;&nbsp;
                              <div className="fw-bold">{issue.issueId}</div>
                            </div>
                          </div>
                        ) : null}
                      </div>
                      <div
                        className="col-lg-3 d-flex"
                        style={{
                          backgroundColor: "rgba(0, 79, 135, 0.1)",
                          height: "8rem",
                          borderRight: "10px solid white",
                        }}
                      >
                        {issue.status === "In Progress" ? (
                          <div
                            className="p-1 m-1 d-flex flex-column justify-content-between"
                            style={{
                              border: "1px solid lightgray",
                              backgroundColor: "white",
                              borderRadius: "0.5rem",
                              overflow: "auto",
                            }}
                          >
                            <div
                              onClick={() => navigateToIssue(issue._id, issue)}
                              className="issue-title-hover"
                            >
                              {issue.title}
                            </div>
                            <div className="d-flex align-items-end">
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
                              >
                                {issue.assignee.charAt(0)}
                              </div>
                              &nbsp;&nbsp;
                              <div className="fw-bold">{issue.issueId}</div>
                            </div>
                          </div>
                        ) : null}
                      </div>
                      <div
                        className="col-lg-3 d-flex"
                        style={{
                          backgroundColor: "rgba(0, 79, 135, 0.1)",
                          height: "8rem",
                          borderRight: "10px solid white",
                        }}
                      >
                        {issue.status === "Verify" ? (
                          <div
                            className="p-1 m-1 d-flex flex-column justify-content-between"
                            style={{
                              border: "1px solid lightgray",
                              backgroundColor: "white",
                              borderRadius: "0.5rem",
                              overflow: "auto",
                            }}
                          >
                            <div
                              onClick={() => navigateToIssue(issue._id, issue)}
                              className="issue-title-hover"
                            >
                              {issue.title}
                            </div>
                            <div className="d-flex align-items-end">
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
                              >
                                {issue.assignee.charAt(0)}
                              </div>
                              &nbsp;&nbsp;
                              <div className="fw-bold">{issue.issueId}</div>
                            </div>
                          </div>
                        ) : null}
                      </div>
                      <div
                        className="col-lg-3 d-flex"
                        style={{
                          backgroundColor: "rgba(0, 79, 135, 0.1)",
                          height: "8rem",
                        }}
                      >
                        {issue.status === "Done" ? (
                          <div
                            className="p-1 m-1 d-flex flex-column justify-content-between"
                            style={{
                              border: "1px solid lightgray",
                              backgroundColor: "white",
                              borderRadius: "0.5rem",
                              overflow: "auto",
                            }}
                          >
                            <div
                              onClick={() => navigateToIssue(issue._id, issue)}
                              className="issue-title-hover"
                            >
                              {issue.title}
                            </div>
                            <div className="d-flex align-items-end">
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
                              >
                                {issue.assignee.charAt(0)}
                              </div>
                              &nbsp;&nbsp;
                              <div className="fw-bold">{issue.issueId}</div>
                            </div>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                );
              })
            : null}
        </div>
      </div>
    </div>
  );
}

export default Board;
