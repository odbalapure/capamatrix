const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const jwtDecode = require("jwt-decode");
const bcrypt = require("bcryptjs");

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: process.env.SEND_GRID_TOKEN,
    },
  })
);

/**
 * @desc Register a user
 * @param {*} req
 * @param {*} res
 */
const register = async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = user.createJwt();

  transporter.sendMail({
    to: user.email,
    from: "ombalapure@outlook.com",
    subject: "URL Shortner - Email Confirmation",
    html: `<h4>Hi ${user.name}! Please click the below link for email confirmation.</h4>
      <p>Confirm email for <a href="https://guvi-task-session-37.herokuapp.com/api/v1/auth/confirm/${token}">${user.email}</a></p>
    `,
  });

  res
    .status(StatusCodes.CREATED)
    .json({ name: user.name, email: user.email, activated: false, token });
};

/**
 * @desc Confirm email id
 * @param {*} req
 * @param {*} res
 */
const confirm = async (req, res) => {
  const decodedObj = jwtDecode(req.params.token);
  await User.findOneAndUpdate(
    { email: decodedObj.email },
    { $set: { activated: true } },
    { upsert: true }
  );

  res.send(`<h3><u>URL Shortner</u></h3>
      <p style="color: green;"><b>Hi there, your account has been activated!</b></p>
    `);
};

/**
 * @desc Login a user
 * @param {*} req
 * @param {*} res
 */
const login = async (req, res) => {
  const { email, password } = req.body;

  // User must provide email and password
  if (!email || !password) {
    throw new Error("Please provide email and password");
  }

  // Check if the user exists in the database
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(403).json({ msg: "Invalid credentials!" });
  }

  if (!user.activated) {
    return res.status(403).json({ msg: "Account has not been activated!" });
  }

  // Compare passwords
  const isPassCorrect = await user.comparePassword(password);
  if (!isPassCorrect) {
    throw new Error("Invalid credentials");
  }

  const token = user.createJwt();
  res.status(StatusCodes.OK).json({
    name: user.name,
    email: user.email,
    activated: user.activated,
    role: user.role,
    token,
  });
};

/**
 * @desc Update password
 * @param {*} req
 * @param {*} res
 */
const forgotPassword = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user || !user.activated) {
    return res.status(404).json({ msg: "User does not exist" });
  }

  transporter.sendMail({
    to: user.email,
    from: "ombalapure@outlook.com",
    subject: "URL Shortner - Password Reset",
    html: `<h4>Hi ${user.name}! Please click the below link to reset your password.</h4>
      <p>Confirm email for <a href="https://password-reset-task-37.netlify.app/reset-password/${user.email}">${user.email}</a></p>
    `,
  });

  res.status(200).json({ nsg: "Password reset link sent!" });
};

/**
 * @desc Reset password
 * @param {*} req
 * @param {*} res
 */
const resetPassword = async (req, res) => {
  // User credentials:  { email: 'ombalapure7@gmail.com', password: 'secret2' }

  const user = await User.findOne({ email: req.body.email });
  if (!user || !user.activated) {
    return res.status(404).json({ msg: "User does not exist" });
  }

  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(req.body.password, salt);

  await User.findOneAndUpdate(
    { email: req.body.email },
    { $set: { password: password } },
    { upsert: true }
  );

  res.status(200).json({ msg: "Password reset successful" });
};

module.exports = {
  register,
  login,
  confirm,
  forgotPassword,
  resetPassword,
};
