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
    console.error("user_post validation", errors.array());
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
  console.log(uid);
  res.json({ message: `user added with id: ${uid}`, status: 200 });
};

module.exports = {
  register,
};
