"use strict";
const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { register } = require("../controller/authController");
// login with email and password
//router.post("/login", login);
// register with full name, email and password
router.post(
  "/register",
  body("username").isLength({ min: 3 }),
  body("email").isEmail(),
  body("password").matches("(?=.*[A-Z]).{8,}"),
  register
);

module.exports = router;
