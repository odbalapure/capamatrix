import { useNavigate } from "react-router";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const url = process.env.REACT_APP_API_URL + "/auth/login";

function Login() {
  const [warning, setWarning] = useState("");
  const emailRef = useRef();
  const passwordRef = useRef();

  // Navigate to backlog page after login
  const navigate = useNavigate();
  const navigateToHome = () => navigate("/backlog", { replace: true });

  /**
   * @desc Login a user
   * @method POST
   * @param {*} event
   */
  const loginDetails = async () => {
    setWarning("");

    if (emailRef.current.value === "" || passwordRef.current.value === "") {
      setWarning("Email and password are mandatory!");
      return;
    }

    try {
      const response = await axios.post(`${url}`, {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });

      console.log("User login: ", response.data);

      const localStorageObj = {
        name: response.data.name,
        email: response.data.email,
        role: response.data.role,
        token: response.data.token,
      };

      localStorage.setItem("capamatrix_user", JSON.stringify(localStorageObj));
      navigateToHome();
      window.location.reload(false);
    } catch (error) {
      setWarning("User may not exist or the account has not been verified!");
    }
  };

  return (
    <div
      style={{ marginTop: "5rem" }}
      className="container d-flex justify-content-center flex-wrap flex-column"
    >
      <div
        style={{
          border: "1px solid lightgray",
          padding: "1rem",
          margin: "2rem",
          borderRadius: "1rem",
        }}
      >
        <form>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter email address"
              ref={emailRef}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter password"
              ref={passwordRef}
            />
          </div>
          <div className="my-3 d-flex justify-content-around">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="Remember"
                id="remember"
              />
              <label className="form-check-label" htmlFor="remember">
                Remember Me
              </label>
            </div>
            <div>
              <Link style={{ textDecoration: "none" }} to="/forgot-password">
                Forgot Password?
              </Link>
            </div>
          </div>
          <div className="d-grid gap-2">
            <button
              className="btn btn-primary"
              type="button"
              onClick={loginDetails}
            >
              SIGN IN
            </button>
            <div className="my-2" style={{ textAlign: "center" }}>
              Not a member?{" "}
              <Link style={{ textDecoration: "none" }} to="/signup">
                Register
              </Link>
            </div>
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
