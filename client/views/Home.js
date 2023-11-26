import React, { useContext } from "react";
import {
  Alert,
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Colors from "../utils/Colors";
import Logo from "./Logo";
import HomeButton from "../components/HomeButton";
import AlertIcon from "../assets/alert.png";
import HomeIcon from "../assets/home.png";
import HistroyIcon from "../assets/history.png";
import logOut from "../assets/log-out.png";
import settings from "../assets/settings.png";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { deleteUserDataFromAsyncStorage } from "../services/UserApi";
import { MainContext } from "../MainContext";

const Home = ({ navigation }) => {
  const navDirection = "Home";
  const { setIsLoggedIn, user } = useContext(MainContext);

  const handleLogOut = () => {
    Alert.alert(
      "Log Out",
      "Are you sure you want to log out?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Log Out",
          onPress: async () => {
            await deleteUserDataFromAsyncStorage();
            setIsLoggedIn(false);
            navigation.navigate("Main");
          },
        },
      ],
      { cancelable: false }
    );
  };

  const handleSettings = () => {
    navigation.navigate("Settings", { navDirection });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={{ marginLeft: 20 }} onPress={handleLogOut}>
          <Image source={logOut} />
        </TouchableOpacity>
        <TouchableOpacity style={{ marginRight: 20 }} onPress={handleSettings}>
          <Image source={settings} />
        </TouchableOpacity>
      </View>
      <Logo />
      <HomeButton title="Rooms" icon={HomeIcon} navigation={navigation} />
      <HomeButton title="Alerts" icon={AlertIcon} navigation={navigation} />
      <HomeButton
        title="View Camera"
        icon={HistroyIcon}
        navigation={navigation}
      />
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
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 16,
  },
});

export default Home;
