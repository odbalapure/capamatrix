import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const url = process.env.REACT_APP_API_URL;

function CreateSprint() {
  // Messages
  const [success, setSuccess] = useState("");
  const [warning, setWarning] = useState("");

  // Form fields
  const [goal, setGoal] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  // Navigate to backlog
  const navigate = useNavigate();
  const navigateToBacklog = () => navigate("/backlog", { replace: true });

  /**
   * @desc Prevent submission
   * @param {*} e
   */
  const handleSubmit = (e) => {
    e.target.reset();
    e.preventDefault();
  };

  /**
   * @desc Create sprint
   */
  const createSprint = async () => {
    try {
      if (goal === "" || start === "" || end === "") {
        setWarning("All fields are mandatory!");
        setTimeout(() => setWarning(""), 4000);
        return;
      }

      const response = await axios.post(`${url}/sprints`, {
        goal,
        start,
        end,
      });

      setWarning("");
      setSuccess(response.data.msg);
      navigateToBacklog();
    } catch (error) {
      setSuccess("");
      setWarning("Failed to create sprint, try again later...");
    }
  };

  return (
    <>
      <div
        style={{
          border: "1px solid lightgray",
          padding: "1rem",
          margin: "2rem",
          borderRadius: "1rem",
          boxSizing: "border-box",
          marginTop: "7rem",
        }}
      >
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="mb-3">
            <label htmlFor="goal" className="form-label fw-bold">
              Goal
            </label>
            <input
              type="text"
              className="form-control"
              id="goal"
              onChange={(e) => setGoal(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="start-end" className="form-label fw-bold">
              Start Date
            </label>
            <input
              type="date"
              className="form-control"
              id="start-end"
              onChange={(e) => setStart(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="end-date" className="form-label fw-bold">
              End Date
            </label>
            <input
              type="date"
              className="form-control"
              id="end-date"
              onChange={(e) => setEnd(e.target.value)}
            />
          </div>
          <div className="d-grid gap-2">
            <button
              className="btn btn-success"
              type="submit"
              onClick={createSprint}
            >
              Create Sprint
            </button>
          </div>
        </form>

        {warning ? (
          <p
            className="d-flex justify-content-center alert alert-danger mt-3"
            role="alert"
          >
            Username, Email and Password are mandatory!
          </p>
        ) : null}
        {success ? (
          <p
            className="d-flex justify-content-center alert alert-success mt-3"
            role="alert"
          >
            Sprint was created
          </p>
        ) : null}
      </div>
    </>
  );
}

export default CreateSprint;
