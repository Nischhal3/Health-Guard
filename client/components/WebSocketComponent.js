// App.js
import React, { useState, useEffect, useContext } from "react";
import { View, Text } from "react-native";
import io from "socket.io-client";
import { MainContext } from "../MainContext";

const SERVER_URL = "http://192.168.11.5:3000"; // Update the URL

const WebSocketComponent = () => {
  const [data, setData] = useState("Loading...");
  const [data2, setData2] = useState("Loading...");
  const { user } = useContext(MainContext);

  useEffect(() => {
    const socket = io(SERVER_URL, {
      auth: { token: user.token },
    });

    // Listen for 'data' event from the server
    socket.on("data", (newData) => {
      setData(newData);
    });

    // Listen for 'data2' event from the server
    socket.on("data2", (newData) => {
      setData2(newData);
    });

    // Clean up the socket connection when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, []); // Run this effect only once when the component mounts

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>{data}</Text>
      <Text>{data2}</Text>
    </View>
  );
};

export default WebSocketComponent;