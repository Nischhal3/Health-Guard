import React from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";
import Colors from "../utils/Colors";
import Headers from "../components/Headers";

const Rooms = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Headers navDirection="Rooms" navigation={navigation} />
      <Text>Rooms</Text>
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
    paddingHorizontal: 16, // Add padding for spacing from edges
    paddingTop: 16, // Add padding for spacing from the top
  },
});
export default Rooms;
