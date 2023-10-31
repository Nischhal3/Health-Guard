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

// Dummy data for demonstration
let backendData = "Initial data";
let backendData2 = "Test Data";

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

io.on("connection", (socket) => {
  console.log("Client connected");

  // Send initial data to the client
  socket.emit("data", backendData);
  socket.emit("data2", backendData2);

  // Simulate a data change every 5 seconds for demonstration
  setInterval(() => {
    // Simulate a data change
    backendData = "Updated data at " + new Date().toLocaleTimeString();
    backendData2 = "test data" + new Date().toLocaleTimeString();

    // Notify all connected clients about the data change through WebSocket
    io.emit("data", backendData);
    io.emit("data2", backendData2);
  }, 5000);

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
