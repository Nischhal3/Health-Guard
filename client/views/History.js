import React from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";
import Colors from "../utils/Colors";
import Headers from "../components/Headers";
import WebSocketComponent from "../components/WebSocketComponent";

const History = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Headers navDirection="History" navigation={navigation} />
      <Text>History</Text>
      <WebSocketComponent />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: Colors.primary,
  },
});
export default History;
