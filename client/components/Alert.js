import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Colors from "../utils/Colors";
import deleteIcon from "../assets/delete.png";

const Alert = (props) => {
  const handleDelete = () => {
    console.log("Delet button pressed");
  };
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{props.title}</Text>
        <TouchableOpacity onPress={handleDelete}>
          <Image style={styles.deleteIcon} source={deleteIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.messageContainer}>
        <Text style={styles.message}>{props.message}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    margin: 10,
    borderRadius: 20,
  },
  titleContainer: {
    flexDirection: "row",
    backgroundColor: Colors.alertTitleBackgorund,
    justifyContent: "space-between",
  },
  title: {
    color: Colors.alertTitle,
    padding: 5,
    marginLeft: 10,
    marginTop: 5,
    fontSize: 18,
  },
  deleteIcon: {
    margin: 15,
    width: 18,
    height: 18,
  },
  messageContainer: {
    backgroundColor: Colors.alertMessageBackground,
  },
  message: {
    color: Colors.alertMessag,
    padding: 10,
    fontSize: 16,
  },
});
export default Alert;
