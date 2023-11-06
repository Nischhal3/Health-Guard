"use strict";
require("dotenv").config();
const jwt = require("jsonwebtoken");

const authenticateSocket = (socket, next) => {
  const token = socket.handshake.auth.token;
  console.log("token", token);
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

// const handleSocketEvents = (mqttClient, io) => {
//   let data = { topic: "", message: "" };

//   io.on("connection", (socket) => {
//     console.log("Client connected");

//     socket.on("data", (data) => {
//       console.log("Received data from client:", data.message);

//       // You can process the received data here and send a response if needed

//       // Example: Send a response back to the client
//       socket.emit("serverResponse", { message: "Data received successfully" });
//     });

//     socket.emit("mqttMessage", data);

//     mqttClient.on("message", (topic, message) => {
//       //   console.log(`Received message on topic ${topic}: ${message.toString()}`);
//       console.log(`Received message on topic ${topic}`);

//       data = {
//         topic: topic,
//         message: message.toString(),
//       };

//       io.emit("mqttMessage", data);

//       socket.on("disconnect", () => {
//         console.log("Client disconnected");
//       });
//     });
//   });
// };

const handleSocketEvents = (socket, io, mqttClient) => {
  console.log("Client connected");

  // Event listener for receiving client data
  socket.on("data", (data) => {
    console.log("Received data from client:", data.message);

    // Process the received data here and send a response if needed

    // Example: Send a response back to the client
    io.sockets.emit("serverResponse", {
      message: "Data received successfully",
    });
  });

  // Emit an initial mqttMessage with empty data
  socket.emit("mqttMessage", { topic: "", message: "" });

  // Event listener for MQTT messages
  mqttClient.on("message", (topic, message) => {
    console.log(`Received message on topic ${topic}`);

    const data = {
      topic: topic,
      message: message.toString(),
    };

    // Emit the MQTT message to the connected client
    socket.emit("mqttMessage", data);
  });

  // Disconnect event
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
};

module.exports = {
  authenticateSocket,
  handleSocketEvents,
};
