import { Route, Routes, BrowserRouter } from "react-router-dom";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./components/Register";
import Backlog from "./pages/Backlog";
import Employee from "./pages/Employee";
import SingleEmployee from "./pages/SingleEmployee";
import Issue from "./pages/Issue";
import Board from "./pages/Board";
import CreateSprint from "./pages/CreateSprint";
import EditIssue from "./pages/EditIssue";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Board />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/create-sprint" element={<CreateSprint />}></Route>
          <Route path="/signup" element={<Register />}></Route>
          <Route path="/issue/:id" element={<Issue />}></Route>
          <Route path="/edit-issue" element={<EditIssue />}></Route>
          <Route path="/people" element={<Employee />}></Route>
          <Route path="/people/:id" element={<SingleEmployee />}></Route>
          <Route path="/backlog" element={<Backlog />}></Route>
          <Route path="/forgot-password" element={<ForgotPassword />}></Route>
          <Route
            path="/reset-password/:email"
            element={<ResetPassword />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
