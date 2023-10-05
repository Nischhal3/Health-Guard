import React from "react";
import { Image, StyleSheet, View } from "react-native";
import LogoImage from "../assets/logo.png";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

const Logo = () => {
  return (
    <View style={styles.container}>
      <Image source={LogoImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    height: hp("18%"),
    marginTop: 10,
  },
});

export default Logo;
