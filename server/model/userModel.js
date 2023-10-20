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
    console.log("model insert user", rows);
    return rows.insertId;
  } catch (e) {
    console.error("Model add user", e.message);
  }
};

module.exports = { getAllUsers, addUser };
