// App.js
import React, { useState, useEffect, useContext } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
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
      setImageData(data.message);
    });

    // Clean up the socket connection when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, []);

  const sendDataToServer = () => {
    console.log("Sending message to server");
    const socket = io(baseUrl, {
      auth: { token: user.token },
    });

    // Emit the data to the server
    socket.emit("data", { message: "test" });

    socket.disconnect();
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {imageData ? (
        <Image
          style={{ width: 300, height: 200 }}
          source={{ uri: `data:image/png;base64,${imageData}` }}
        />
      ) : (
        <Text>Loading....</Text>
      )}
      <TouchableOpacity
        onPress={sendDataToServer}
        style={{
          backgroundColor: "#3498db", // Example background color
          padding: 10,
          borderRadius: 5,
          width: 200, // Adjust the width as needed
          height: 40, // Adjust the height as needed
          alignItems: "center",
          justifyContent: "center",
          marginTop: 10, // Optional spacing
        }}
      >
        <Text style={{ color: "#fff" }}>Send Data to Server</Text>
      </TouchableOpacity>
    </View>
  );
};

export default WebSocketComponent;
