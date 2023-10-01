import React from "react";
import { SafeAreaView, ScrollView } from "react-native";
import { FormButton, FormInput, FormNavigationText } from "./FormComponents";
import Logo from "../views/Logo";

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

export default RegisterForm;
