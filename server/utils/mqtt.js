"use strict";
require("dotenv").config();
const mqtt = require("mqtt");
const fs = require("fs");

const connectToMQTTBroker = (caPath, certPath, keyPath) => {
  const options = {
    port: process.env.mqttBrokerPort,
    protocol: process.env.protocol,
    host: process.env.mqttBrokerAddress,
    ca: fs.readFileSync(caPath),
    cert: fs.readFileSync(certPath),
    key: fs.readFileSync(keyPath),
    rejectUnauthorized: true,
    username: process.env.mqttUsername,
    password: process.env.mqttPassword,
  };

  const mqttClient = mqtt.connect(options);

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

const subscribeToMQTTTopics = (mqttClient, topics) => {
  const mqttTopics = ["mqtt_temp", "mqtt_image", "system_info"];
  mqttTopics.forEach((topic) => {
    mqttClient.subscribe(topic, (err) => {
      if (err) {
        console.error(`Error subscribing to ${topic}: ${err}`);
      } else {
        console.log(`Subscribed to ${topic}`);
      }
    });
  });
};

const publishMessageToMQTTClient = (socket, mqttClient) => {
  // Event listener for MQTT messages
  mqttClient.on("message", (topic, message) => {
    console.log(`Received message on topic ${topic}`);
    let data;
    let sensorType;
    try {
      data = JSON.parse(message.toString());
      sensorType = data.sensor;
    } catch (error) {
      console.error("Error parsing message:", error);
    }

    const formattedData = {
      topic: topic,
      sensorType: sensorType,
      message: data,
    };

    // Emit the MQTT message to the connected client
    socket.emit("mqttMessage", formattedData);
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
  subscribeToMQTTTopics,
  publishMessageToMQTTClient,
  publishMessageToMQTTServer,
};
