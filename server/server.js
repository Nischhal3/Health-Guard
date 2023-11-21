"use strict";
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const notificationRouter = require("./routes/notificationRoute");
const authRoute = require("./routes/authRoute");
const passport = require("./utils/passport");
const http = require("http");
const socketIo = require("socket.io");
const server = http.createServer(app);
const io = socketIo(server);
const PORT = 3000;
const { connectToMQTTBroker, subscribeToMQTTTopic } = require("./utils/mqtt");
const { authenticateSocket, handleSocketEvents } = require("./utils/socket");

app.use(cors());
// use passport autentication
app.use(passport.initialize());
// Use the express.json() middleware to handle JSON data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRoute);
app.use(
  "/",
  passport.authenticate("jwt", { session: false }),
  notificationRouter
);

io.use(authenticateSocket);
const mqttClient = connectToMQTTBroker();
mqttClient.setMaxListeners(15);
//subscribeToMQTTTopic(mqttClient);

io.on("connection", (socket) => {
  //handleSocketEvents(socket, mqttClient);
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
