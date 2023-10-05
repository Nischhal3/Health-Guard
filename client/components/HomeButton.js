import React from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import Colors from "../utils/Colors";

const HomeButton = (props) => {
  const handleButton = () => {
    props.navigation.navigate(props.title);
  };
  const container = {
    marginTop: props.title === "Rooms" ? 90 : 0,
    backgroundColor: Colors.secondary,
    height: 60,
    marginHorizontal: "10%",
    borderRadius: 20,
    marginBottom: 70,
  };

  return (
    <SafeAreaView style={container}>
      <TouchableOpacity style={styles.interface} onPress={handleButton}>
        <Text style={styles.text}>{props.title}</Text>
        <Image source={props.icon} style={{ marginRight: 20 }} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  interface: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    flex: 1,
  },
  text: {
    color: Colors.white,
    fontSize: 25,
  },
});
export default HomeButton;
