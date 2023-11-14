"use strict";
require("dotenv").config();
const mqtt = require("mqtt");

const connectToMQTTBroker = () => {
  console.log("connecting to mosquitto broker...");
  const mqttClient = mqtt.connect(process.env.mqttBrokerAddress, {
    clientId: "testNode",
    protocolId: "MQIsdp",
    protocolVersion: 3,
    connectTimeout: 1000,
    debug: true,
  });
  mqttClient.on("connect", () => {
    console.log("Connected to MQTT broker");
  });

  mqttClient.on("error", (err) => {
    console.error(`MQTT error: ${err}`);
  });

  mqttClient.on("close", () => {
    console.log("Connection to MQTT broker closed");
  });

  return mqttClient;
};

const subscribeToMQTTTopic = (mqttClient) => {
  const mqttTopic = process.env.mqttTopic;

  mqttClient.subscribe(mqttTopic, (err) => {
    if (err) {
      console.error(`Error subscribing to ${mqttTopic}: ${err}`);
    } else {
      console.log(`Subscribed to ${mqttTopic}`);
    }
  });
};
const publishMessageToMQTTClient = async (socket, mqttClient) => {
  // Event listener for MQTT messages
  mqttClient.on("message", (topic, message) => {
    console.log(`Received message on topic ${topic}`);
    const data = {
      topic: topic,
      message: message.toString(),
    };
    // Emit the MQTT message to the connected client
    console.log(data);
    socket.emit("tempData", data);
  });
};

module.exports = {
  connectToMQTTBroker,
  subscribeToMQTTTopic,
  publishMessageToMQTTClient,
};
