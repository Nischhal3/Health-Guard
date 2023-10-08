import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import Colors from "../utils/Colors";

export const SensorDetails = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Sensors</Text>
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
