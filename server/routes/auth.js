const express = require("express");
const router = express.Router();

const {
  register,
  login,
  confirm,
  forgotPassword,
  resetPassword,
} = require("../controllers/auth");

router.post("/register", register);
router.get("/confirm/:token", confirm);
router.patch("/forgot-password", forgotPassword);
router.patch("/reset-password", resetPassword);
router.post("/login", login);

module.exports = router;
