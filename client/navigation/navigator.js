import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { MainContext } from "../MainContext";
import GlobalStyles from "../utils/GlobalStyles";
import Main from "../views/Main";
import Home from "../views/Home";
import Rooms from "../views/Rooms";
import Alerts from "../views/Alerts";
import Settings from "../views/Settings";
import { SensorDetails } from "../views/SensorDetails";
import Colors from "../utils/Colors";
import CameraView from "../views/CameraView";

const Stack = createStackNavigator();

const NavScareen = () => {
  const { isLoggedIn, user, setIsLoggedIn } = useContext(MainContext);

  useEffect(() => {
    if (Object.keys(user).length > 0) {
      setIsLoggedIn(true);
    }
  }, [user]);

  return (
    <SafeAreaView style={[styles.container, GlobalStyles.AndroidSafeArea]}>
      <NavigationContainer>
        {!isLoggedIn ? (
          <Stack.Navigator
            initialRouteName={"Main"}
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="Main" component={Main} />
            <Stack.Screen name="Home" component={Home} />
          </Stack.Navigator>
        ) : (
          <Stack.Navigator
            initialRouteName={"Home"}
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Rooms" component={Rooms} />
            <Stack.Screen name="Alerts" component={Alerts} />
            <Stack.Screen name="View Camera" component={CameraView} />
            <Stack.Screen name="Settings" component={Settings} />
            <Stack.Screen name="SensorDetails" component={SensorDetails} />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
  },
});

export default NavScareen;
