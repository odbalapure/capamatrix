import { useState } from "react";
import { useLocation } from "react-router";
import axios from "axios";

const url = process.env.REACT_APP_API_URL;

function EditIssue() {
  const location = useLocation();

  // Change issue description and title
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Messages
  const [success, setSuccess] = useState("");
  const [warning, setWarning] = useState("");

  /**
   * @desc Edit issue details
   */
  const editDetails = async () => {
    try {
      const issueResponse = await axios.patch(
        `${url}/issues/issue/${location.state._id}`,
        {
          title,
          description,
        }
      );

      setSuccess(issueResponse.data.msg);
      setWarning("");
      setTimeout(() => setSuccess(""), 4000);
      console.log(issueResponse);
    } catch (error) {
      setSuccess("");
      setWarning("Something went wrong try again...");
    }
  };

  /**
   * @desc Prevent submission
   * @param {*} e
   */
  const handleSubmit = (e) => {
    e.target.reset();
    e.preventDefault();
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
            <label htmlFor="title" className="form-label fw-bold">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              onChange={(e) => setTitle(e.target.value)}
              defaultValue={title ? title : location.state.title}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label fw-bold">
              Description
            </label>
            <textarea
              style={{ height: "15rem" }}
              type="text"
              className="form-control"
              id="description"
              onChange={(e) => setDescription(e.target.value)}
              defaultValue={description ? description : location.state.description}
            ></textarea>
          </div>
          <div className="d-grid gap-2">  
            <button
              className="btn btn-success"
              type="submit"
              onClick={editDetails}
            >
              Edit Details
            </button>
          </div>
        </form>
        {warning ? (
          <p
            className="d-flex justify-content-center alert alert-danger mt-3"
            role="alert"
          >
            {warning}
          </p>
        ) : null}
        {success ? (
          <p
            className="d-flex justify-content-center alert alert-success mt-3"
            role="alert"
          >
            {success}
          </p>
        ) : null}
      </div>
    </>
  );
}

export default EditIssue;
