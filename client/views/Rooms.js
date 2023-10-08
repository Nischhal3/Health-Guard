import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text } from "react-native";
import Colors from "../utils/Colors";
import Headers from "../components/Headers";
import RoomInfoBar from "../components/RoomInfoBar";

const Rooms = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Headers navDirection="Rooms" navigation={navigation} />
      <ScrollView>
        <RoomInfoBar title="Living Room" navigation={navigation} />
        <RoomInfoBar title="Bed Room" navigation={navigation} />
        <RoomInfoBar title="Kitchen Room" navigation={navigation} />
        <RoomInfoBar title="Bath Room" navigation={navigation} />
      </ScrollView>
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
});
export default Rooms;
