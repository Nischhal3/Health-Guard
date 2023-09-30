import React from "react";
import { Image, SafeAreaView, StyleSheet } from "react-native";
import LogoImage from "../assets/logo.png";

const Logo = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Image source={LogoImage} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 50,
    height: 150,
  },
});

export default Logo;
