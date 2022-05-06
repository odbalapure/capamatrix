const express = require("express");
const router = express.Router();

const { getAllEmployees, createEmployee } = require("../controllers/employee");

router.post("/", createEmployee);
router.get("/", getAllEmployees);

module.exports = router;
