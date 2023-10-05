import React from "react";
import { Dimensions, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { FormButton, FormInput, FormNavigationText } from "./FormComponents";
import Logo from "../views/Logo";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const RegisterForm = (props) => {
  return (
    <SafeAreaView style={{ height: "100%" }}>
      <ScrollView>
        <Logo />
        <FormInput title="Username" />
        <FormInput title="E-mail" />
        <FormInput title="Password" />
        <FormInput title="Confirm Password" />
        <FormButton title="Register" />
        <FormNavigationText
          title="Already have an account? Login Here!"
          formToggle={props.formToggle}
          setFormToggle={props.setFormToggle}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: hp("100%"),
    width: wp("100%"),
  },
});
export default RegisterForm;
