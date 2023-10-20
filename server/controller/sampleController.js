"use strict";

const { testData, postData } = require("../model/sampleModel");

const get_all_data = async (req, res) => {
  //res.json({ message: `News not found`, status: 409 });
  const data = await testData();
  if (data.length > 0) {
    res.json(data);
  } else {
    res.json({ message: `News not found`, status: 409 });
  }
};
const post_data = async (req, res, next) => {
  const data = req.body;
  const id = await postData(data);
  res.json({ message: `${id}`, status: 200 });
};

module.exports = { get_all_data, post_data };
