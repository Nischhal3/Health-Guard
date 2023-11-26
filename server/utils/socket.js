"use strict";
require("dotenv").config();
const jwt = require("jsonwebtoken");
const {
  publishMessageToMQTTClient,
  publishMessageToMQTTServer,
} = require("./mqtt");

const authenticateSocket = (socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) {
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

const handleSocketEvents = (socket, mqttClient) => {
  // Event listener for receiving client data
  socket.on("tempData", (data) => {
    // Event listener for publishing client data to MQTT in PI
    publishMessageToMQTTServer(mqttClient, data, "temp_data");
  });
  // Event listener for publishing data to client [Front-end]
  publishMessageToMQTTClient(socket, mqttClient);

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
};

module.exports = {
  authenticateSocket,
  handleSocketEvents,
};
