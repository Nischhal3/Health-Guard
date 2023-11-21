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

const publishMessageToMQTTClient = (socket, mqttClient) => {
  // Event listener for MQTT messages
  mqttClient.on("message", (topic, message) => {
    console.log(`Received message on topic ${topic}`);
    const data = {
      topic: topic,
      message: message.toString(),
    };
    console.log("data", data);
    // Emit the MQTT message to the connected client
    socket.emit("mqttMessage", data);
  });
};

const publishMessageToMQTTServer = (mqttClient, data, topic) => {
  mqttClient.publish(topic, JSON.stringify(data), (err) => {
    if (err) {
      console.error("Error publishing data:", err);
    } else {
      console.log("Data published successfully:", data);
    }
  });
};

module.exports = {
  connectToMQTTBroker,
  subscribeToMQTTTopic,
  publishMessageToMQTTClient,
  publishMessageToMQTTServer,
};
