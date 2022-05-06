import React, { useContext, useState, useEffect } from "react";
import axios from "axios";

const url = process.env.REACT_APP_API_URL;
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  // Login details
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [role, setRole] = useState("");

  // Get assignees and sprints
  const [assignees, setAssignees] = useState([]);
  const [sprints, setSprints] = useState([]);

  /**
   * @desc Check if a user is logged in and is an admin or not
   */
  useEffect(() => {
    if (localStorage.getItem("capamatrix_user")) {
      if (JSON.parse(localStorage.getItem("capamatrix_user")).name !== "") {
        setIsLoggedIn(true);
        setUserName(JSON.parse(localStorage.getItem("capamatrix_user")).name);
      }

      if (
        JSON.parse(localStorage.getItem("capamatrix_user")).role === "ADMIN"
      ) {
        setRole("ADMIN");
      } else {
        setRole("USER");
      }
    }
  }, []);

  /**
   * @desc Get assignees
   */
  const getAssignees = async () => {
    const assigneesResponse = await axios.get(`${url}/employees`);
    setAssignees(assigneesResponse.data.employees);
  };

  /**
   * @desc Get sprints
   */
  const getSprints = async () => {
    const sprintResponse = await axios.get(`${url}/sprints`);
    setSprints(sprintResponse.data.sprints);
  };

  useEffect(() => {
    getAssignees();
    getSprints();
  }, []);

  return (
    <AppContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, userName, role, assignees, sprints }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
