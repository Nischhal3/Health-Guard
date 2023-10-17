'use strict';

const express = require('express');
const { get_all_data } = require('../controller/sampleController');
const router = express.Router();

router.route('/').get(get_all_data)

module.exports = router