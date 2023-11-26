// App.js
import React, { useState, useEffect, useContext } from "react";
import { View, Text, Image } from "react-native";
import io from "socket.io-client";
import { MainContext } from "../MainContext";
import { baseUrl } from "../utils/Variables";

const WebSocketComponent = () => {
  const [imageData, setImageData] = useState(null);
  const { user } = useContext(MainContext);

  useEffect(() => {
    const socket = io(baseUrl, {
      auth: { token: user.token },
    });
    socket.on("mqttMessage", (data) => {
      if (data.sensorType === "camera") {
        setImageData(data.message);
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
      {imageData ? (
        <Image
          style={{ width: 350, height: 300, borderRadius: 5, margin: 5 }}
          source={{ uri: `data:image/png;base64,${imageData.image_url}` }}
        />
      ) : (
        <Text>Loading....</Text>
      )}
    </View>
  );
};

export default WebSocketComponent;
