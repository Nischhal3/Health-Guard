"use strict";

const express = require("express");
const { get_all_data, post_data } = require("../controller/sampleController");
const router = express.Router();

router.route("/sample").get(get_all_data).post(post_data);

module.exports = router;
