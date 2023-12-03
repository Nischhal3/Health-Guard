import React, { useContext } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Colors from "../utils/Colors";
import deleteIcon from "../assets/delete.png";
import { MainContext } from "../MainContext";
import { deleteNotificationById } from "../services/NotificationApi";
import { showToast } from "../utils/Variables";
import ToastContainer from "react-native-toast-message";

const Notification = ({ notification }) => {
  const { user, handleChange, setHandleChange } = useContext(MainContext);
  const handleDelete = () => {
    Alert.alert(
      "Delete Notification",
      "Are you sure you want to delete this notification?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            const response = await deleteNotificationById(
              notification.sensor_id,
              user.token
            );
            const deleteNotification = await response.json();
            if (deleteNotification.status === 200) {
              setHandleChange(!handleChange);
              showToast("success", deleteNotification.message);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };
  const date = new Date(notification.date);
  const formattedTime = date.toLocaleTimeString();
  const room = notification.location
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>
          {notification.type} Sensor Alert {formattedTime}
        </Text>
        <TouchableOpacity onPress={handleDelete}>
          <Image style={styles.deleteIcon} source={deleteIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.messageContainer}>
        <Text style={styles.message}>
          {notification.warning} [{room}]
        </Text>
      </View>
      <ToastContainer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    margin: 10,
  },
  titleContainer: {
    flexDirection: "row",
    backgroundColor: Colors.alertTitleBackgorund,
    justifyContent: "space-between",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  title: {
    color: Colors.alertTitle,
    marginLeft: 10,
    marginTop: 5,
    fontSize: 18,
  },
  deleteIcon: {
    margin: 10,
    width: 18,
    height: 18,
  },
  messageContainer: {
    backgroundColor: Colors.alertMessageBackground,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  message: {
    color: Colors.alertMessag,
    padding: 10,
    fontSize: 16,
  },
});
export default Notification;
