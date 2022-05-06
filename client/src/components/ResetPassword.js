import axios from "axios";
import { useRef, useState } from "react";
import { useParams } from "react-router-dom";

// const url = "http://localhost:5000/api/v1/auth/reset-password";
const url = "https://guvi-task-session-37.herokuapp.com/api/v1/auth/reset-password";

function ResetPassword() {
  const params = useParams();
  const [warning, setWarning] = useState("");
  const passwordRef = useRef();

  const resetPassword = async (event) => {
    setWarning("");
    event.preventDefault();

    if (passwordRef) {
      if (passwordRef.current.value === "") {
        setWarning("Please enter a password!");
        return;
      }

      try {
        await axios.patch(`${url}`, {
          email: params.email,
          password: passwordRef.current.value,
        });
      } catch (error) {
        setWarning("User does not exist...");
      }
    }
  };

  return (
    <div
      className="container"
      style={{
        border: "1px solid lightgray",
        marginTop: "2rem",
        borderRadius: "1rem",
      }}
    >
      <form className="py-5">
        <div className="mb-3">
          <label htmlFor="password" className="form-label fw-bold">
            Enter new password for "{params.email}"
          </label>
          <input
            type="text"
            className="form-control"
            id="password"
            ref={passwordRef}
            placeholder="New password"
          />
        </div>
        <div className="d-grid gap-2">
          <button
            className="btn btn-success"
            type="button"
            onClick={resetPassword}
            style={{ marginTop: "1rem" }}
          >
            Reset Password
          </button>
        </div>
      </form>
      <div>
        {warning ? (
          <p
            className="d-flex justify-content-center alert alert-danger"
            role="alert"
          >
            {warning}
          </p>
        ) : null}
      </div>
    </div>
  );
}

export default ResetPassword;
