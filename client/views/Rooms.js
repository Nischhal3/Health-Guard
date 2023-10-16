import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import Colors from "../utils/Colors";
import Headers from "../components/Headers";
import RoomInfoBar from "../components/RoomInfoBar";

const Rooms = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Headers navDirection="Rooms" navigation={navigation} />
      <View style={styles.roomContainer}>
        <Text style={styles.text}>Your Rooms</Text>
        <ScrollView>
          <RoomInfoBar title="Living Room" navigation={navigation} />
          <RoomInfoBar title="Bed Room" navigation={navigation} />
          <RoomInfoBar title="Kitchen Room" navigation={navigation} />
          <RoomInfoBar title="Bath Room" navigation={navigation} />
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
