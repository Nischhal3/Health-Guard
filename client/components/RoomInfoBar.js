import React from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import motion from "../assets/motion.png";
import temp from "../assets/temp.png";
import light from "../assets/light.png";
import Colors from "../utils/Colors";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

const RoomInfoBar = ({ title, navigation, roomLocation }) => {
  const handleClick = async () => {
    navigation.navigate("SensorDetails", { roomLocation });
  };
  return (
    <TouchableOpacity style={styles.container} onPress={handleClick}>
      <Text style={styles.room}>{title}</Text>
      <Image source={light} />
      <Image source={temp} />
      <Image source={motion} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 30,
    backgroundColor: Colors.secondary,
    padding: 15,
    borderRadius: 20,
    width: wp("90%"),
    marginHorizontal: 15,
    margin: 15,
  },
  room: {
    color: Colors.white,
    fontWeight: "400",
    fontSize: 23,
    marginLeft: -20,
  },
});
export default RoomInfoBar;
