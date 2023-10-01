import React from "react";
import {
  Button,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Colors from "../utils/Colors";
import Logo from "./Logo";
import HomeButton from "../components/HomeButton";
import AlertIcon from "../assets/alert.png";
import HomeIcon from "../assets/home.png";
import HistroyIcon from "../assets/history.png";
import logOut from "../assets/log-out.png";
import settings from "../assets/settings.png";

const Home = ({ navigation }) => {
  const navDirection = "Home";

  const handleLogOut = () => {
    console.log("logout pressed");
  };
  const handleSettings = () => {
    navigation.navigate("Settings", { navDirection });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleLogOut}>
          <Image source={logOut} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSettings}>
          <Image source={settings} />
        </TouchableOpacity>
      </View>
      <Logo />
      <HomeButton title="Rooms" icon={HomeIcon} navigation={navigation} />
      <HomeButton title="Alerts" icon={AlertIcon} navigation={navigation} />
      <HomeButton title="History" icon={HistroyIcon} navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: Colors.primary,
  },
  header: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16, // Add padding for spacing from edges
    paddingTop: 16, // Add padding for spacing from the top
  },
});

export default Home;
