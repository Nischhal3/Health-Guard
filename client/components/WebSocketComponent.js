// App.js
import React, { useState, useEffect, useContext } from "react";
import { View, Text, Image } from "react-native";
import io from "socket.io-client";
import { MainContext } from "../MainContext";
import { baseUrl } from "../utils/Variables";

const WebSocketComponent = () => {
  const [imageData, setImageData] = useState(null);
  const [systemInfo, setSystemInfo] = useState(null);
  useEffect(() => {
    const socket = io(baseUrl, {
      auth: { token: user.token },
    });
    socket.on("mqttMessage", (data) => {
      if (data.sensorType === "camera") {
        setImageData(data.message);
      } else if (data.sensorType === "in_build") {
        setSystemInfo(data.message);
      }
    });

    socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
    });

    // Clean up the socket connection when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, [user.token]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {/* {imageData ? (
        <Image
          style={{ width: 350, height: 300, borderRadius: 5, margin: 5 }}
          source={{ uri: `data:image/png;base64,${imageData.image_url}` }}
        />
      ) : (
        <Text>Loading....</Text>
      )}
      {systemInfo !== null && (
        <View>
          <Text>CPU: {systemInfo.CPU}</Text>
          <Text>DISK: {systemInfo.Disk}</Text>
          <Text>Memory Usage: {systemInfo.MemUsage}</Text>
          <Text>IP Address: {systemInfo.IP}</Text>
          <Text>System temperature: {systemInfo.Temperature}</Text>
        </View>
      )}
  );
};

export default WebSocketComponent;
