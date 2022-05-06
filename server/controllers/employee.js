const Employee = require("../models/Employee");

/**
 * @desc Get all employee records
 * @param {*} req
 * @param {*} res
 * @returns
 */
const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    return res.status(200).json({ length: employees.length, employees });
  } catch (err) {
    return res.status(500).json({
      msg: "Failed to fetch employee records, try some time later...",
    });
  }
};

/**
 * @desc Create an employee
 * @param {*} req
 * @param {*} res
 * @returns
 */
const createEmployee = async (req, res) => {
  try {
    console.log(req.body);
    const people = await Employee.create(req.body);
    return res
      .status(200)
      .json({ msg: "Employee created successfully!", people });
  } catch (err) {
    return res.status(500).json({
      msg: "Failed to create the employee records...",
    });
  }
};

module.exports = {
  getAllEmployees,
  createEmployee,
};
