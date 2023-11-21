"use strict";

const {
  postNotification,
  getAllNotification,
} = require("../model/notificationModel");
const { validationResult } = require("express-validator");
const { httpError } = require("../utils/errors");

const get_all_notification = async (req, res) => {
  const data = await getAllNotification();
  if (data.length > 0) {
    res.json(data);
  } else {
    res.json({ message: `No notification found`, status: 409 });
  }
};

const post_notification = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.error("Notificartion validation", errors.array());
    const err = httpError("data not valid", 400);
    next(err);
    return;
  }
  const data = req.body;
  const id = await postNotification(data);
  res.json({ message: `${id}`, status: 200 });
};

module.exports = { get_all_notification, post_notification };
