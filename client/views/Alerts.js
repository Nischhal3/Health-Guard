import React, { useContext, useEffect, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
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
import { getAllNotification } from "../services/NotificationApi";

const Alerts = ({ navigation }) => {
  const { user } = useContext(MainContext);
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = async () => {
    try {
      const token = user.token;
      console.log(token);
      if (token) {
        const response = await getAllNotification(token);
        const notificationsData = await response.json();
        setNotifications(notificationsData);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
    // Fetch notifications every 1 minute
    const intervalId = setInterval(fetchNotifications, 60000);
    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [user]);

  const clearAllNotifications = () => {
    console.log("clear notifications");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Headers navDirection="Alerts" navigation={navigation} />
      <Text style={styles.notificationText}>Notifications</Text>
      <View style={styles.notificationContainer}>
        {notifications.length > 0 && (
          <FlatList
            data={notifications}
            keyExtractor={(notification) => notification.sensor_id.toString()} // Convert to string
            renderItem={({ item: notification }) => (
              <Notification notification={notification} />
            )}
          />
        )}
      </View>
      <TouchableOpacity onPress={clearAllNotifications}>
        <Text style={styles.clearText}>Clear All Notification</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: hp("100%"),
    width: wp("100%"),
    backgroundColor: Colors.primary,
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
    height: hp("75%"),
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
