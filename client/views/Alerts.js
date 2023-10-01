import React from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";
import Colors from "../utils/Colors";
import Headers from "../components/Headers";

const Alerts = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Headers navDirection="Alerts" navigation={navigation} />
      <Text>Alerts</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: Colors.primary,
  },
});
export default Alerts;
