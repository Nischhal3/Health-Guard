"use strict";
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const router = require("./routes/SampleRoute");
const authRoute = require("./routes/authRoute");
const passport = require("./utils/passport");
const jwt = require("jsonwebtoken");
const http = require("http");
const socketIo = require("socket.io");
const server = http.createServer(app);
const io = socketIo(server);
const PORT = 3000;
const mqtt = require("mqtt");

app.use(cors());
// use passport autentication
app.use(passport.initialize());
// Use the express.json() middleware to handle JSON data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRoute);
app.use("/", passport.authenticate("jwt", { session: false }), router);

// Middleware to authenticate socket connections based on token
io.use((socket, next) => {
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
});

// Connect to the MQTT broker
const mqttClient = mqtt.connect("mqtt://localhost:1883");
// Subscribe to a topic
const mqttTopic = "test_topic";
mqttClient.subscribe(mqttTopic, (err) => {
  if (err) {
    console.error(`Error subscribing to ${mqttTopic}: ${err}`);
  } else {
    console.log(`Subscribed to ${mqttTopic}`);
  }
});

let data = { topic: "", message: "" };
io.on("connection", (socket) => {
  console.log("Client connected");

  socket.emit("mqttMessage", data);
  // Listen for messages on the subscribed topic
  mqttClient.on("message", (topic, message) => {
    console.log(`Received message on topic ${topic}: ${message.toString()}`);

    data = {
      topic: topic,
      message: message.toString(),
    };
    // Notify all connected clients about the data change through WebSocket
    io.emit("mqttMessage", data);

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
