import axios from "axios";
import { useRef, useState } from "react";

const url = process.env.REACT_APP_API_URL + "/auth/register";

function Register() {
  const [success, setSuccess] = useState(false);
  const [warning, setWarning] = useState("");
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const signupDetails = async (event) => {
    event.preventDefault();

    if (emailRef.current.value === "" || passwordRef.current.value === "") {
      setWarning("Username, Email and password are mandatory!");
    } else {
      setWarning("");
    }

    const user = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      const response = await axios.post(`${url}`, user);

      const localStorageObj = {
        email: response.data.email,
        token: response.data.token,
        activated: response.data.activated,
      };

      localStorage.setItem(
        "url_shortner_user",
        JSON.stringify(localStorageObj)
      );

      setSuccess(true);
    } catch (error) {
      setWarning("User registration failed, try again some time later...");
    }
  };

  return (
    <div className="container d-flex justify-content-center flex-column">
      <div
        style={{
          border: "1px solid lightgray",
          padding: "1rem",
          margin: "2rem",
          borderRadius: "1rem",
          boxSizing: "border-box",
        }}
      >
        <form className="py-5">
          <div className="mb-3">
            <label htmlFor="name" className="form-label fw-bold">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              ref={nameRef}
            />
          </div>
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
          <div className="d-grid gap-2">
            <button
              className="btn btn-primary"
              type="button"
              onClick={signupDetails}
            >
              Register
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
            Username, Email and Password are mandatory!
          </p>
        ) : null}
      </div>
      <div>
        {success ? (
          <p
            className="d-flex justify-content-center alert alert-success"
            role="alert"
          >
            An email has been sent to {emailRef.current.value}, to confirm your
            registration!
          </p>
        ) : null}
      </div>
    </div>
  );
}

export default Register;
