"use strict";
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
const router = require("./routes/SampleRoute");
const authRoute = require("./routes/authRoute");

app.use(cors());
// Use the express.json() middleware to handle JSON data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", router);
app.use("", authRoute);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
