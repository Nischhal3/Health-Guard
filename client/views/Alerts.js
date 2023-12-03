import React, { useContext, useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import Colors from "../utils/Colors";
import Headers from "../components/Headers";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Notification from "../components/Notification";
import { MainContext } from "../MainContext";
import {
  deleteAllNotification,
  getAllNotification,
} from "../services/NotificationApi";
import deleteAll from "../assets/deleteAll.png";
import { showToast } from "../utils/Variables";
import ToastContainer from "react-native-toast-message";

const Alerts = ({ navigation }) => {
  const { user, handleChange, setHandleChange } = useContext(MainContext);
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = async () => {
    try {
      const token = user.token;
      if (token) {
        const response = await getAllNotification(token);
        const notificationsData = await response.json();
        setNotifications(notificationsData);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const deleteAllNotifications = () => {
    Alert.alert(
      "Delete Notification",
      "Are you sure you want to delete all notification?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            const response = await deleteAllNotification(user.token);
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
  useEffect(() => {
    fetchNotifications();
    // Fetch notifications every 1 minute
    const intervalId = setInterval(fetchNotifications, 1000);
    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [user, handleChange]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Headers
          navDirection="Alerts"
          navigation={navigation}
          showIcon={false}
        />
        <TouchableOpacity
          style={styles.deleteAll}
          onPress={deleteAllNotifications}
        >
          <Image source={deleteAll} />
        </TouchableOpacity>
      </View>
      <Text style={styles.notificationText}>Notifications</Text>
      <View style={styles.notificationContainer}>
        {notifications.length > 0 && (
          <FlatList
            data={notifications}
            keyExtractor={(notification) => notification.sensor_id.toString()}
            renderItem={({ item: notification }) => (
              <Notification notification={notification} />
            )}
          />
        )}
      </View>
      <ToastContainer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: hp("100%"),
    width: wp("100%"),
    backgroundColor: Colors.primary,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  deleteAll: {
    marginRight: 15,
    marginTop: 30,
    height: 20,
  },
  notificationText: {
    marginTop: -25,
    color: Colors.white,
    fontSize: 30,
    textDecorationLine: "underline",
    alignSelf: "center",
  },
  notificationContainer: {
    backgroundColor: Colors.secondary,
    // height: hp("75%"),
    width: wp("90%"),
    marginTop: 20,
    marginHorizontal: 20,
    borderRadius: 15,
    display: "flex",
  },
  clearText: {
    color: Colors.white,
    marginTop: 20,
    fontSize: 25,
    textDecorationLine: "underline",
    alignSelf: "center",
  },
});
export default Alerts;
