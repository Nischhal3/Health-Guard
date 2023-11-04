"use strict";
require("dotenv").config();
const mqtt = require("mqtt");

const connectToMQTTBroker = () => {
  const mqttClient = mqtt.connect(process.env.mqttBrokerAddress, {
    username: process.env.mqttUsername,
    password: process.env.mqttPassword,
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

module.exports = {
  connectToMQTTBroker,
  subscribeToMQTTTopic,
};
