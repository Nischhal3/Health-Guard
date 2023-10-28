import React from "react";
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
const Alerts = ({ navigation }) => {
  // Generate an array of 10 fake sample notifications
  const notifications = Array.from({ length: 10 }, (_, index) => ({
    id: index.toString(),
    title:
      index % 2 === 0
        ? "Temperature Sensor Notification"
        : index % 3 === 0
        ? "Light Sensor Notification"
        : "Motion Sensor Notification",
    // title: `Temperature Notificatio ${index + 1}`,
    message:
      index % 2 === 0
        ? "Temperature too low (12 degree) in Living Room"
        : index % 3 === 0
        ? "Light Intensity is very low in kitchen"
        : "No Motion detected in last 2 hours",
  }));

  const clearAllNotifications = () => {
    console.log("clear notifications");
  };
  return (
    <SafeAreaView style={styles.container}>
      <Headers navDirection="Alerts" navigation={navigation} />
      <Text style={styles.notificationText}>Notifications</Text>
      <View style={styles.notificationContainer}>
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ScrollView>
              <Notification title={item.title} message={item.message} />
            </ScrollView>
          )}
        />
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
