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
import { register } from "../api/SampleApi";

const RoomInfoBar = ({ title, navigation }) => {
  const handleClick = async () => {
    const formData = new FormData();
    formData.append("name", "test");
    formData.append("age", 19);
    try {
      const data = await register(formData);
    } catch (error) {
      console.error(error);
    }
    //navigation.navigate("SensorDetails");
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
