import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const url = process.env.REACT_APP_API_URL;

function Employee() {
  // Employee data
  const [teams, setTeams] = useState([]);

  // Messages
  const [msg, setMsg] = useState("");
  const [warning, setWarning] = useState("");

  const navigate = useNavigate();
  const navigateToEmployee = (employee) => {
    navigate(
      `/people/${employee._id}`,
      { state: employee },
      { replace: true }
    );
  };

  /**
   * @desc Create an issue
   * @request POST
   */
  const getEmployees = useCallback(async () => {
    try {
      setMsg("Getting employees please wait...");
      const teamResponse = await axios.get(`${url}/teams`);
      setTeams(teamResponse.data.teams);
      setMsg("");
      setWarning("");
    } catch (error) {
      setMsg("");
      setWarning("Failed to fetch employees...");
      setTimeout(() => setWarning(""), 4000);
    }
  }, []);

  useEffect(() => {
    getEmployees();
  }, [getEmployees]);

  return (
    <>
      <div className="container" style={{ marginTop: "5rem" }}>
        {teams.length > 0 ? (
          teams.map((team) => {
            return (
              <div key={team._id}>
                <div className="fs-5">{team.name}</div>
                <hr />
                <div className="d-flex" style={{ overflow: "auto" }}>
                  {team.members.map((member) => {
                    return (
                      <div
                        className="p-3 mb-4 d-flex flex-column align-items-center justify-content-center"
                        style={{
                          border: "1px solid lightgray",
                          borderRadius: "0.5rem",
                          width: "10rem",
                          height: "14rem",
                          marginRight: "1rem",
                          cursor: "pointer",
                          minWidth: "13rem",
                        }}
                        onClick={() => navigateToEmployee(member)}
                        key={member._id}
                      >
                        <img
                          style={{
                            width: "80%",
                            borderRadius: "50%",
                          }}
                          src={member.image}
                          alt="display_picture"
                        />
                        <div className="d-flex flex-column justify-content-center align-items-center">
                          <div className="fw-bold fs-6">{member.name}</div>
                          <div>{member.designation}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })
        ) : (
          <h1
            className="d-flex justify-content-center align-items-center"
            style={{ marginTop: "30%" }}
          >
            {msg}
          </h1>
        )}
      </div>
      {warning ? (
        <p
          className="d-flex justify-content-center alert alert-danger m-3"
          role="alert"
        >
          {warning}
        </p>
      ) : null}
    </>
  );
}

export default Employee;
