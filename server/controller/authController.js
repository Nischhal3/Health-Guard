"use strict";
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const { httpError } = require("../utils/errors");
const { getAllUsers, addUser } = require("../model/userModel");
const bcrypt = require("bcrypt");

const register = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.error("registration validation", errors.array());
    const err = httpError("data not valid", 400);
    next(err);
    return;
  }

  const allUsers = await getAllUsers();
  const emailExists = allUsers.some((user) => user.email === req.body.email);

  if (emailExists) {
    res.json({ message: "This user email already exist", status: 409 });
    return;
  }
  // Password encryption
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
  const user = {
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
  };
  const uid = await addUser(user);
  res.json({ message: `user added with id: ${uid}`, status: 200 });
};

const login = (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        message: "Invalid email or password",
        status: 400,
      });
    }

    req.login(user, { session: false }, (err) => {
      if (err) {
        return res.status(400).json({
          message: "Login error",
          status: 400,
        });
      }
    });

    // generate a signed son web token with the contents of user object and return it in the response
    const token = jwt.sign(user, process.env.JWT_SECRET);
    return res.json({ user: user, token: token, status: 200 });
  })(req, res, next);
};
module.exports = {
  register,
  login,
};
