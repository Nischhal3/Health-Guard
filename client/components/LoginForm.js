import React from "react";
import { SafeAreaView } from "react-native";
import { FormButton, FormInput, FormNavigationText } from "./FormComponents";
import Logo from "../views/Logo";

const LoginForm = (props) => {
  return (
    <SafeAreaView style={{ height: "100%" }}>
      <Logo />
      <FormInput title="Username" />
      <FormInput title="Password" />
      <FormButton title="Login" navigation={props.navigation} />
      <FormNavigationText
        title="Don't have an account? Register Here!"
        formToggle={props.formToggle}
        setFormToggle={props.setFormToggle}
      />
    </SafeAreaView>
  );
};

export default LoginForm;
