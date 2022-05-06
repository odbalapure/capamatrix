require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const cors = require("cors");

// Db connection
const connectDb = require("./db/connect");

// Auth middleware
const authMiddleware = require("./middleware/authentication");

// Routers
const authRouter = require("./routes/auth");
const teamRouter = require("./routes/team");
const employeeRouter = require("./routes/employee");
const sprintRouter = require("./routes/sprint");
const issueRouter = require("./routes/issue");

// Error handlers
const notFoundMiddleware = require("./middleware/not-found");
app.use(cors({ origin: "*" }));
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("<h1>Capacity Planning Tool.</h1>");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/teams", teamRouter);
app.use("/api/v1/employees", employeeRouter);
app.use("/api/v1/issues", issueRouter);
app.use("/api/v1/sprints", sprintRouter);
app.use(notFoundMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDb(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
