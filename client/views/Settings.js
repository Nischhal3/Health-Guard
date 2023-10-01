import React from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import Colors from "../utils/Colors";
import backButton from "../assets/backButton.png";

const Settings = ({ navigation, route }) => {
  const { navDirection } = route.params;
  const handleBackButton = () => {
    navigation.navigate(navDirection);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={handleBackButton}>
        <Image source={backButton} />
      </TouchableOpacity>
      <Text>Settings</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    height: "100%",
  },
});

export default Settings;
