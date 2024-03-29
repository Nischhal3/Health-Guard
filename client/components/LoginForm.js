import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView, View } from "react-native";
import {
  ErrorMessage,
  FormButton,
  FormInput,
  FormNavigationText,
} from "./FormComponents";
import Logo from "../views/Logo";
import { useForm, Controller } from "react-hook-form";
import { login, saveUserDataToAsyncStorage } from "../services/UserApi";
import { MainContext } from "../MainContext";
import ToastContainer from "react-native-toast-message";
import { showToast } from "../utils/Variables";

const LoginForm = (props) => {
  const { formToggle, setFormToggle, navigation } = props;
  const { setIsLoggedIn } = useContext(MainContext);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await login(data);
      if (response.status === 200) {
        const userData = {
          data: response.user,
          token: response.token,
        };
        console.log(userData);
        await saveUserDataToAsyncStorage(userData);
        setIsLoggedIn(true);
        navigation.navigate("Home");
      } else {
        showToast("success", response.message);
      }
    } catch (error) {
      console.error("Login error: ", error);
    }
  };

  return (
    <SafeAreaView style={{ height: "100%" }}>
      <Logo />
      <View>
        <Controller
          control={control}
          render={({ field }) => (
            <FormInput
              title="Email"
              value={field.value}
              onChange={field.onChange}
              secret={false}
            />
          )}
          name="email"
          rules={{
            required: { value: true, message: "Email is required." },
            pattern: {
              value: /\S+@\S+\.\S+$/,
              message: "Not valid email.",
            },
          }}
        />
        <ErrorMessage error={errors?.email} message={errors?.email?.message} />

        <Controller
          control={control}
          render={({ field }) => (
            <FormInput
              title="Password"
              placeholder="Enter your password"
              secret={true}
              value={field.value}
              onChange={field.onChange}
            />
          )}
          name="password"
          rules={{
            required: { value: true, message: "This field cannot be empty" },
            pattern: {
              /**
               *  Password criteria
               *  Minimum length 8 , atlease 1 digit
               *  Atleast 1 upper case of lower case character
               */
              value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
              message: "Min 8 characters, uppercase & number",
            },
          }}
        />
        <ErrorMessage
          error={errors?.password}
          message={errors?.password?.message}
        />

        <FormButton title="Login" submit={handleSubmit(onSubmit)} />
      </View>
      <FormNavigationText
        title="Don't have an account? Register Here!"
        formToggle={formToggle}
        setFormToggle={setFormToggle}
      />
      <ToastContainer />
    </SafeAreaView>
  );
};

export default LoginForm;
