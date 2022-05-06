import { useState } from "react";
import icon from "../images/icon.ico";
import axios from "axios";
import { useGlobalContext } from "../context";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";

const url = process.env.REACT_APP_API_URL;

function Navbar() {
  // Issue details
  const [type, setType] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [assignee, setAssignee] = useState("");
  const [sprint, setSprint] = useState("");

  // Get assignees, sprints and username
  const { assignees, sprints, userName } = useGlobalContext();

  // Messages
  const [success, setSuccess] = useState("");
  const [warning, setWarning] = useState("");

  // Navigate to backlog page after login
  const navigate = useNavigate();
  const navigateToLogin = () => navigate("/login", { replace: true });

  /**
   * @desc Create an issue
   * @request POST
   */
  const createIssue = async (e) => {
    try {
      if (
        type === "" ||
        title === "" ||
        description === "" ||
        priority === ""
      ) {
        setWarning("Please enter the mandatory fields!");
        setTimeout(() => setWarning(""), 4000);
        return;
      }

      setSuccess("Creating issue please wait...");
      const response = await axios.post(`${url}/issues`, {
        type,
        title,
        description,
        priority,
        assignee,
        sprint,
        reporter: userName,
      });

      setWarning("");
      setSuccess(response.data.msg);
      setTimeout(() => setSuccess(""), 3000);
      window.location.reload();
    } catch (error) {
      setSuccess("");
      setWarning("Failed to create isssue...");
      setTimeout(() => setWarning(""), 4000);
    }
  };

  /**
   * @desc Clear form inputs and prevent submission
   * @param
   */
  const handleSubmit = (e) => {
    e.target.reset();
    e.preventDefault();
  };

  /**
   * @desc Logout user
   */
  const logoutUser = () => {
    localStorage.removeItem("capamatrix_user");
    navigateToLogin();
    window.location.reload(false);
  };

  return (
    <>
      {/* Navbar code */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <div className="container-fluid">
          <div>
            <img height="30px" src={icon} alt="app-logo" />
          </div>
          <a className="navbar-brand" href="/">
            CapaMatrix
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item nav-link active">
                <Link style={{ textDecoration: "none", color: "#000" }} to="/">
                  Board
                </Link>
              </li>
              <li className="nav-item nav-link active">
                <Link
                  style={{ textDecoration: "none", color: "#000" }}
                  to="/people"
                >
                  People
                </Link>
              </li>
              <li className="nav-item nav-link active">
                <Link
                  style={{ textDecoration: "none", color: "#000" }}
                  to="/backlog"
                >
                  Backlog
                </Link>
              </li>
              {!userName ? (
                <li className="nav-item nav-link active">
                  <Link
                    style={{ textDecoration: "none", color: "#000" }}
                    to="/login"
                  >
                    Login
                  </Link>
                </li>
              ) : null}
              <li className="nav-item">
                <button
                  className="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  Create
                </button>
              </li>
            </ul>
            <div className="dropdown dropstart">
              {userName ? (
                <button
                  style={{
                    borderRadius: "50%",
                    width: "3rem",
                    height: "3rem",
                    backgroundColor: "#3a67c2",
                  }}
                  className="btn btn-primary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {userName.charAt(0)}
                </button>
              ) : null}
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton1"
              >
                <li>
                  <a className="dropdown-item" href="/login">
                    Login
                  </a>
                </li>
                <li>
                  <div
                    onClick={() => logoutUser()}
                    style={{ cursor: "pointer" }}
                    className="dropdown-item"
                  >
                    Logout
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      {/* Modal code */}
      <div
        className="modal"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Create Issue
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={(e) => handleSubmit(e)}>
                {/* Issue Type */}
                <div>
                  Issue Type <span style={{ color: "red" }}>*</span>
                  <select
                    className="form-select"
                    onChange={(e) => setType(e.target.value)}
                  >
                    <option>Select Type</option>
                    <option value="Bug">Bug</option>
                    <option value="Story">Story</option>
                    <option value="Task">Task</option>
                  </select>
                </div>
                {/* Title */}
                <div style={{ marginTop: "1rem" }}>
                  Title <span style={{ color: "red" }}>*</span>
                  <div>
                    <input
                      className="form-control"
                      type="text"
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                </div>
                <hr />
                {/* Description */}
                <div>
                  <div>
                    Description <span style={{ color: "red" }}>*</span>
                  </div>
                  <textarea
                    className="form-control"
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
                {/* Priority */}
                <div style={{ marginTop: "1rem" }}>
                  <div>
                    Priority <span style={{ color: "red" }}>*</span>
                  </div>
                  <select
                    onChange={(e) => setPriority(e.target.value)}
                    className="form-select"
                  >
                    <option>Select Priority</option>
                    <option value="P1">P1 (Certain)</option>
                    <option value="P2">P2 (Likely)</option>
                    <option value="P3">P3 (Moderate)</option>
                    <option value="P4">P4 (Minimal)</option>
                  </select>
                </div>
                {/* Asignee */}
                <div style={{ marginTop: "1rem" }}>
                  <div>Assignee</div>
                  <select
                    onChange={(e) => setAssignee(e.target.value)}
                    className="form-select"
                  >
                    <option>Select Assignee</option>
                    {assignees.map((assingee) => {
                      return (
                        <option key={assingee.name}>{assingee.name}</option>
                      );
                    })}
                  </select>
                </div>
                {/* Sprint */}
                <div style={{ marginTop: "1rem" }}>
                  <div>Sprint</div>
                  <select
                    onChange={(e) => setSprint(e.target.value)}
                    className="form-select"
                  >
                    <option>Select Sprint</option>
                    {sprints.map((sprint) => {
                      return <option key={sprint.name}>{sprint.name}</option>;
                    })}
                  </select>
                </div>
                <div className="mt-4 modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={createIssue}
                  >
                    Create Issue
                  </button>
                </div>
              </form>
            </div>

            {/* Warning message */}
            {warning ? (
              <p
                className="d-flex justify-content-center alert alert-danger m-3"
                role="alert"
              >
                {warning}
              </p>
            ) : null}
            {/* Success message */}
            {success ? (
              <p
                className="d-flex justify-content-center alert alert-success m-3"
                role="alert"
              >
                {success}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
