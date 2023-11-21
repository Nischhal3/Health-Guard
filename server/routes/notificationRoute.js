"use strict";

const express = require("express");
const { body } = require("express-validator");
const {
  get_all_notification,
  post_notification,
} = require("../controller/notificationController");

const router = express.Router();

router
  .route("/notification")
  .get(get_all_notification)
  .post(
    body("location").not().isEmpty().withMessage("Location cannot be empty"),
    body("warning").not().isEmpty().withMessage("Warning cannot be empty"),
    body("sensor_reading")
      .not()
      .isEmpty()
      .withMessage("Sensor Reading cannot be empty"),
    body("type").not().isEmpty().withMessage("Type cannot be empty"),
    body("userId").not().isEmpty().withMessage("User ID cannot be empty"),
    post_notification
  );

module.exports = router;
