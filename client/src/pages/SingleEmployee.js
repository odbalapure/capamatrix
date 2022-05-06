import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";

const url = process.env.REACT_APP_API_URL;

function SingleEmployee() {
  const location = useLocation();
  const [issues, setIssues] = useState([]);

  /**
   * @desc Get employee details
   * @method GET
   */
  const getEmployeeTasks = useCallback(async () => {
    const response = await axios.get(
      `${url}/issues/assigned/${location.state.name}`
    );

    setIssues(response.data.issues);
  }, [location.state]);

  useEffect(() => {
    getEmployeeTasks();
  }, [getEmployeeTasks]);

  const navigate = useNavigate();
  const navigateToIssue = (id, issue) => {
    navigate(`/issue/${id}`, { state: issue }, { replace: true });
  };

  return (
    <div className="container" style={{ marginTop: "5rem" }}>
      <div className="row">
        <div className="col-lg-5">
          <div className="card" style={{ height: "30rem" }}>
            <img
              style={{ height: "70%" }}
              className="card-img-top p-3"
              src={location.state.image}
              alt="dp"
            />
            <div className="card-body">
              <div>
                <span className="fw-bold">Name</span>: {location.state.name}
              </div>
              <div>
                <span className="fw-bold">Email</span>: {location.state.email}
              </div>
              <div>
                <span className="fw-bold">Designation</span>:{" "}
                {location.state.designation}
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-7">
          <div className="fs-3">Issues worked/working on</div>
          <div>
            {issues?.length > 0 ? (
              issues.map((issue) => {
                return (
                  <div key={issue._id}>
                    <div
                      style={{
                        border: "1px solid lightgray",
                        borderRadius: "0.5rem",
                      }}
                      className="p-2 d-flex justify-content-between align-items-center"
                    >
                      <div className="d-flex align-items-center">
                        {issue.type === "Bug" ? (
                          <i
                            style={{ color: "red", fontSize: "1.5rem" }}
                            className="bi bi-bug-fill"
                          ></i>
                        ) : null}
                        {issue.type === "Story" ? (
                          <i
                            style={{ color: "green", fontSize: "1.2rem" }}
                            className="bi bi-ticket-fill"
                          ></i>
                        ) : null}
                        {issue.type === "Task" ? (
                          <i
                            style={{ color: "dodgerblue", fontSize: "1.2rem" }}
                            className="bi bi-info-square-fill"
                          ></i>
                        ) : null}
                        &nbsp;&nbsp;
                        <div
                          className="issue-title-hover"
                          onClick={() => navigateToIssue(issue._id, issue)}
                          style={{ cursor: "pointer" }}
                        >
                          {issue.title}
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
                          title={
                            issue.assignee
                              ? issue.assignee.charAt(0)
                              : "No Assignee"
                          }
                        >
                          {issue.assignee ? issue.assignee.charAt(0) : "?"}
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
                          {issue.issueId}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div><span style={{fontWeight: "600"}}>{location.state.name}</span> has not worked on any issues yet 🙂!</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleEmployee;
