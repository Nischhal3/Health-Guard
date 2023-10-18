"use strict";

const { getAllNews, testData } = require("../model/sampleModel");

const get_all_data = async (req, res) => {
  //res.json({ message: `News not found`, status: 409 });
  const data = await testData();
  if (data.length > 0) {
    res.json(data);
  } else {
    res.json({ message: `News not found`, status: 409 });
  }
};

module.exports = { get_all_data };
