"use strict";

const {
  postNotification,
  getAllNotification,
  deleteNotificationById,
  deleteAllNotification,
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

const delete_notification = async (req, res, next) => {
  try {
    const notificationId = req.params.id;
    const deletedRowCount = await deleteNotificationById(notificationId);

    if (deletedRowCount > 0) {
      res.json({
        message: `Notification with ID ${notificationId} deleted successfully`,
        status: 200,
      });
    } else {
      const err = httpError(
        `Notification with ID ${notificationId} not found`,
        404
      );
      next(err);
    }
  } catch (error) {
    console.error("Delete notification controller error", error.message);
    const err = httpError("Internal Server Error", 500);
    next(err);
  }
};

const delete_all_notification = async (req, res, next) => {
  try {
    const deletedRowCount = await deleteAllNotification();

    if (deletedRowCount > 0) {
      res.json({
        message: `${deletedRowCount} notifications deleted successfully`,
        status: 200,
      });
    } else {
      const err = httpError("No notifications found to delete", 404);
      next(err);
    }
  } catch (error) {
    console.error("Delete all notification controller error", error.message);
    const err = httpError("Internal Server Error", 500);
    next(err);
  }
};

module.exports = {
  get_all_notification,
  post_notification,
  delete_notification,
  delete_all_notification,
};
