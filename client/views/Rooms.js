import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import Colors from "../utils/Colors";
import Headers from "../components/Headers";
import RoomInfoBar from "../components/RoomInfoBar";
import { MainContext } from "../MainContext";
import { io } from "socket.io-client";
import { baseUrl } from "../utils/Variables";

const Rooms = ({ navigation }) => {
  const { user } = useContext(MainContext);
  const [data, setData] = useState();

  useEffect(() => {
    const socket = io(baseUrl, {
      auth: { token: user.token },
    });

    socket.on("mqttMessage", (data) => {
      if (data.sensorType === "temperature") {
        console.log(`Received data from ${data.sensorType} sensor`);
        setData(data.message);
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
      <Headers navDirection="Rooms" navigation={navigation} />
      <View style={styles.roomContainer}>
        <Text style={styles.text}>Your Rooms</Text>
        <ScrollView>
          {data !== undefined && data.location === "living_room" && (
            <RoomInfoBar
              title="Living Room"
              navigation={navigation}
              data={data}
            />
          )}
          {data !== undefined && data.location === "bed_room" && (
            <RoomInfoBar title="Bed Room" navigation={navigation} data={data} />
          )}
          {data !== undefined && data.location === "kitchen" && (
            <RoomInfoBar title="Kitchen" navigation={navigation} data={data} />
          )}
          {data !== undefined && data.location === "bath_room" && (
            <RoomInfoBar
              title="Bath Room"
              navigation={navigation}
              data={data}
            />
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    height: "100%",
  },
  header: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  roomContainer: {
    marginTop: 45,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  text: {
    alignSelf: "center",
    fontSize: 30,
    color: Colors.white,
  },
});
export default Rooms;
