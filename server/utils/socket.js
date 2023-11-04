"use strict";
require("dotenv").config();
const jwt = require("jsonwebtoken");

const authenticateSocket = (socket, next) => {
  const token = socket.handshake.auth.token;

  if (!token) {
    console.log("token missing");
    return next(new Error("Authentication failed. No token provided."));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return next(new Error("Authentication failed. Invalid token."));
    }

    socket.decoded = decoded;
    next();
  });
};

const publishMQTTMessages = (mqttClient, io) => {
  let data = { topic: "", message: "" };

  io.on("connection", (socket) => {
    console.log("Client connected");

    socket.emit("mqttMessage", data);

    mqttClient.on("message", (topic, message) => {
      console.log(`Received message on topic ${topic}: ${message.toString()}`);

      data = {
        topic: topic,
        message: message.toString(),
      };

      io.emit("mqttMessage", data);

      socket.on("disconnect", () => {
        console.log("Client disconnected");
      });
    });
  });
};

module.exports = {
  authenticateSocket,
  publishMQTTMessages,
};
