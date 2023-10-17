"use strict";

const { getAllNews, testData } = require("../model/sampleModel");

const get_all_data = async (req, res) => {
  const news = await testData();
  if (news.length > 0) {
    res.json(news);
  } else {
    res.json({ message: `News not found`, status: 409 });
  }
};

module.exports = { get_all_data };
