import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import GlobalStyles from "./utils/GlobalStyles";
import Colors from "./utils/Colors";
import { MainContext, MainProvider } from "./MainContext";
import Main from "./views/Main";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./views/Home";
import { useContext, useEffect, useState } from "react";
import Rooms from "./views/Rooms";
import Settings from "./views/Settings";
import History from "./views/History";
import Alerts from "./views/Alerts";
import { SensorDetails } from "./views/SensorDetails";

const Stack = createStackNavigator();

const App = () => {
  const { isLoggedIn } = useContext(MainContext);
  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   async function fetchNews() {
  //     const response = await fetchData();
  //     setData(response);
  //   }
  //   fetchNews();
  // }, []);

  // data.forEach((item) => {
  //   console.log("my-data", item);
  // });
  return (
    <MainProvider>
      <SafeAreaView style={[styles.container, GlobalStyles.AndroidSafeArea]}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={isLoggedIn ? "Home" : "Main"}
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="Main" component={Main} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Rooms" component={Rooms} />
            <Stack.Screen name="Alerts" component={Alerts} />
            <Stack.Screen name="History" component={History} />
            <Stack.Screen name="Settings" component={Settings} />
            <Stack.Screen name="SensorDetails" component={SensorDetails} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </MainProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
  },
});

export default App;
