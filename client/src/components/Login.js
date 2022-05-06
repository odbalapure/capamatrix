import axios from "axios";
import { useNavigate } from "react-router";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

// const url = "http://localhost:5000/api/v1/auth/login";
// const url = "https://guvi-task-session-37.herokuapp.com/api/v1/auth/login";
const url = process.env.REACT_APP_API_URL + "/bookings";

function Login() {
  const [warning, setWarning] = useState("");
  const emailRef = useRef();
  const passwordRef = useRef();

  const navigate = useNavigate();
  const navigateToUrls = () => navigate("/urls", { replace: true });

  const loginDetails = async (event) => {
    event.preventDefault();

    if (emailRef.current.value === "" || passwordRef.current.value === "") {
      setWarning("Email and password are mandatory!");
      return;
    }

    setWarning("");

    const user = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      await axios.post(`${url}`, user);
      navigateToUrls();
    } catch (error) {
      setWarning("User may not exist or the account has not been verified!");
    }
  };

  return (
    <div className="container d-flex justify-content-center flex-wrap flex-column">
      <div
        style={{
          border: "1px solid lightgray",
          padding: "1rem",
          margin: "2rem",
          borderRadius: "1rem",
        }}
      >
        <form className="py-5">
          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-bold">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              ref={emailRef}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label fw-bold">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              ref={passwordRef}
            />
          </div>
          <div className="d-flex justify-content-between">
            <div>
              <Link to="/signup">
                <button
                  style={{
                    color: "dodgerblue",
                    fontWeight: "600",
                    borderStyle: "none",
                    backgroundColor: "#fff",
                  }}
                >
                  <u>Create Account</u>
                </button>
              </Link>
              |
              <Link to="/forgot-password">
                <button
                  style={{
                    color: "#f76865",
                    fontWeight: "600",
                    borderStyle: "none",
                    backgroundColor: "#fff",
                  }}
                >
                  <u>Forgot Password</u>
                </button>
              </Link>
            </div>
            <button
              type="submit"
              className="btn btn-success"
              onClick={loginDetails}
            >
              Login
            </button>
          </div>
        </form>
      </div>
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

export default Login;

// await axios.post(`${url}`, user, {
//   headers: {
//     Authorization:
//       "Bearer " + JSON.parse(localStorage.getItem("url_shortner_user")).token,
//   },
// });
