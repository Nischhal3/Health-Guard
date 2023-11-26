// App.js
import React, { useState, useEffect, useContext } from "react";
import { View, Text, Image, SafeAreaView, StyleSheet } from "react-native";
import io from "socket.io-client";
import { MainContext } from "../MainContext";
import { baseUrl } from "../utils/Variables";
import Colors from "../utils/Colors";
import Headers from "../components/Headers";

const Info = ({ navigation }) => {
  const [imageData, setImageData] = useState(null);
  const [systemInfo, setSystemInfo] = useState(null);
  const { user } = useContext(MainContext);

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
    <SafeAreaView style={styles.container}>
      <Headers navDirection="Home" navigation={navigation} />
      <View style={styles.content}>
        {imageData ? (
          <>
            <Text style={styles.title}>Camera Image</Text>
            <Image
              style={styles.image}
              source={{ uri: `data:image/png;base64,${imageData.image_url}` }}
            />
          </>
        ) : (
          <Text style={styles.loadingText}>Loading....</Text>
        )}

        {systemInfo !== null && (
          <View style={styles.systemInfoContainer}>
            <Text style={styles.title}>Rasberry Pi System Info</Text>
            <Text style={styles.systemInfoText}>CPU: {systemInfo.CPU}</Text>
            <Text style={styles.systemInfoText}>DISK: {systemInfo.Disk}</Text>
            <Text style={styles.systemInfoText}>
              Memory Usage: {systemInfo.MemUsage}
            </Text>
            <Text style={styles.systemInfoText}>
              IP Address: {systemInfo.IP}
            </Text>
            <Text style={styles.systemInfoText}>
              System temperature: {systemInfo.Temperature}
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  content: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 25,
    color: Colors.white,
    marginBottom: 5,
    marginTop: 50,
  },
  image: {
    width: 350,
    height: 300,
    borderRadius: 5,
    margin: 5,
  },
  loadingText: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    color: Colors.white,
  },
  systemInfoContainer: {
    marginTop: 20,
  },
  systemInfoText: {
    fontSize: 20,
    color: Colors.white,
    marginBottom: 5,
  },
});

export default Info;
