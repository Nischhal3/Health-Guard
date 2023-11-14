// App.js
import React, { useState, useEffect, useContext } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import io from "socket.io-client";
import { MainContext } from "../MainContext";
import { baseUrl } from "../utils/Variables";

const WebSocketComponent = () => {
  const [imageData, setImageData] = useState(null);
  const [tempData, setTempData] = useState(null);
  const { user } = useContext(MainContext);

  useEffect(() => {
    const socket = io(baseUrl, {
      auth: { token: user.token },
    });
    // Fetching the data to the server
    socket.on("mqttMessage", (data) => {
      // setImageData(data.message);
      setTempData(data);
    });

    socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
    });

    // Clean up the socket connection when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, [user.token]);
  console.log(tempData);
  const sendDataToServer = () => {
    const socket = io(baseUrl, {
      auth: { token: user.token },
    });

    // Emit the data to the server
    socket.emit("app-data", { message: "Message from Health-Guard" });

    socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
    });

    return () => {
      socket.disconnect();
    };
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {/* {imageData ? (
        <Image
          style={{ width: 350, height: 300, borderRadius: 5, margin: 5 }}
          source={{ uri: `data:image/png;base64,${imageData}` }}
        />
      ) : (
        <Text>Loading....</Text>
      )} */}
      
      <TouchableOpacity
        onPress={sendDataToServer}
        style={{
          backgroundColor: "#3498db",
          padding: 10,
          borderRadius: 5,
          width: 200,
          height: 40,
          alignItems: "center",
          justifyContent: "center",
          marginTop: 10,
        }}
      >
        <Text style={{ color: "#fff" }}>Send Data to Server</Text>
      </TouchableOpacity>
    </View>
  );
};

export default WebSocketComponent;
