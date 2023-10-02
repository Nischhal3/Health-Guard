import React from "react";
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Colors from "../utils/Colors";
import Headers from "../components/Headers";
import Alert from "../components/Alert";

const Alerts = ({ navigation }) => {
  // Generate an array of 10 fake sample notifications
  const notifications = Array.from({ length: 30 }, (_, index) => ({
    id: index.toString(),
    title: `Notification ${index + 1}`,
    message: `This is a sample notification message. This is a another sample notification message! ${
      index + 1
    }`,
  }));

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
              <Alert title={item.title} message={item.message} />
            </ScrollView>
          )}
        />
      </View>
      <Text style={styles.clearText}>Clear All Notification</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: Colors.primary,
  },
  notificationText: {
    color: Colors.white,
    marginTop: 35,
    fontSize: 30,
    textDecorationLine: "underline",
    fontWeight: "bold",
    alignSelf: "center",
  },
  notificationContainer: {
    backgroundColor: Colors.secondary,
    height: "70%",
    marginTop: 20,
    marginHorizontal: 40,
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
