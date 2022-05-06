import axios from "axios";
import { useRef, useState } from "react";

// const url = "http://localhost:5000/api/v1/auth/forgot-password";
const url = "https://guvi-task-session-37.herokuapp.com/api/v1/auth/forgot-password";

function ForgotPassword() {
  const [warning, setWarning] = useState("");
  const emailRef = useRef();

  const forgotPasswordDetails = async (event) => {
    setWarning("");
    event.preventDefault();

    if (emailRef) {
      if (emailRef.current.value === "") {
        setWarning("Please enter an email id!");
        return;
      }

      try {
        await axios.patch(`${url}`, {
          email: emailRef.current.value,
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
          <label htmlFor="email" className="form-label fw-bold">
            Email
          </label>
          <input
            type="text"
            className="form-control"
            id="email"
            ref={emailRef}
            placeholder="Enter email to get password reset link"
          />
        </div>
        <div className="d-grid gap-2">
          <button
            className="btn btn-warning"
            type="button"
            onClick={forgotPasswordDetails}
            style={{ marginTop: "1rem" }}
          >
            Send Password Reset Link
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

export default ForgotPassword;
