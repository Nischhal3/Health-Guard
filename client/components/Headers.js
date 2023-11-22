import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import backButton from "../assets/backButton.png";
import settings from "../assets/settings.png";

const Headers = ({ navigation, navDirection, showIcon = true }) => {
  const handlebackButton = () => {
    if (navDirection === "SensorDetails") {
      navigation.navigate("Rooms");
    } else {
      navigation.navigate("Home");
    }
  };
  const handleSettings = () => {
    console.log("Header navigation");
    navigation.navigate("Settings", { navDirection });
  };
  return (
    <View style={styles.header}>
      <TouchableOpacity style={{ marginLeft: 10 }} onPress={handlebackButton}>
        <Image source={backButton} />
      </TouchableOpacity>
      <TouchableOpacity
        style={{ marginRight: 10, opacity: showIcon ? 1 : 0 }}
        onPress={handleSettings}
      >
        <Image source={settings} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 16,
  },
});

export default Headers;
