// App.js
import React, { useState, useEffect, useContext } from "react";
import { View, Text, Image, SafeAreaView, StyleSheet } from "react-native";
import io from "socket.io-client";
import { MainContext } from "../MainContext";
import { baseUrl } from "../utils/Variables";
import Colors from "../utils/Colors";
import Headers from "../components/Headers";
import {
  getAllNotification,
  postNotification,
} from "../services/NotificationApi";

const Info = ({ navigation }) => {
  const [imageData, setImageData] = useState(null);
  const [systemInfo, setSystemInfo] = useState(null);
  const { user } = useContext(MainContext);
  const [piTemperature, setPiTemperature] = useState(0);
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

  useEffect(() => {
    if (systemInfo !== null) {
      setPiTemperature(parseFloat(systemInfo.Temperature));
    }
  }, [systemInfo]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllNotification(user.token);
        const notifications = await response.json();

        if (piTemperature > 45) {
          const notificationData = {
            location: "internal",
            sensor_reading: piTemperature,
            type: "Pi Temperature",
            userId: user.data.id,
            warning: "Over heating Rasberry Pi",
          };
          /**
           * if notification is empty no checking shall be done
           */
          if (notifications.status === 409) {
            await postNotification(user.token, notificationData);
            return;
          }
          const timeDiffrenceIsMoreThanHour = checkTimeDifference(
            notifications,
            user.data.id
          );
          /**
           * Conditions to execute this block
           * piTemperature should be above 45
           * Pi same user id will wait 1 hour to send next notification
           */
          if (timeDiffrenceIsMoreThanHour) {
            await postNotification(user.token, notificationData);
          }
        }
      } catch (error) {
        console.error("Error posting data:", error);
      }
    };
    // Set up an interval to fetch data every 30 minutes
    const intervalId = setInterval(() => {
      fetchData();
    }, 3000);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

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

const checkTimeDifference = (notifications, userId) => {
  for (const notification of notifications) {
    if (notification.userId === userId) {
      const notificationDate = new Date(notification.date);
      const currentDate = new Date();

      if (!isNaN(notificationDate.getTime())) {
        const timeDifferenceInMilliseconds = currentDate - notificationDate;
        const timeDifferenceInHours =
          timeDifferenceInMilliseconds / (1000 * 60 * 60);
        if (timeDifferenceInHours >= 3) {
          return true;
        }
      } else {
        console.log("Invalid date format");
      }
    }
  }
  return false;
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
