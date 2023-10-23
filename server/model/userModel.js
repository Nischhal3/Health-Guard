"use strict";
const pool = require("../db");
const promisePool = pool.promise();
const { httpError } = require("../utils/errors");

const getAllUsers = async () => {
  try {
    const [rows] = await promisePool.query("SELECT * FROM user");
    return rows;
  } catch (e) {
    console.error("error", e.message);
  }
};

const addUser = async (user) => {
  try {
    const [rows] = await promisePool.execute(
      "INSERT INTO user (email, username, password) VALUES (?,?,?)",
      [user.email, user.username, user.password]
    );
    return rows.insertId;
  } catch (e) {
    console.error("Model add user", e.message);
  }
};

const userLogin = async (params) => {
  try {
    const [rows] = await promisePool.execute(
      "SELECT * FROM user WHERE email = ?;",
      params
    );
    return rows;
  } catch (e) {
    console.log("error", e.message);
  }
};

module.exports = { getAllUsers, addUser, userLogin };
