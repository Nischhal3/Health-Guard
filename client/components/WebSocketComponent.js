// App.js
import React, { useState, useEffect, useContext } from "react";
import { View, Text } from "react-native";
import io from "socket.io-client";
import { MainContext } from "../MainContext";
import { baseUrl } from "../utils/Variables";

const WebSocketComponent = () => {
  const [mqtt, setMqtt] = useState("Loading...");
  const { user } = useContext(MainContext);

  useEffect(() => {
    const socket = io(baseUrl, {
      auth: { token: user.token },
    });

    socket.on("mqttMessage", (newData) => {
      setMqtt(newData);
    });

    // Clean up the socket connection when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, []);

  console.log("mqtt", mqtt);
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {mqtt.message === "" ? (
        <Text>Loading....</Text>
      ) : (
        <Text>{mqtt.message}</Text>
      )}
    </View>
  );
};

export default WebSocketComponent;
