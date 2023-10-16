import React from "react";
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import {
  ErrorMessage,
  FormButton,
  FormInput,
  FormNavigationText,
} from "./FormComponents";
import Logo from "../views/Logo";
import { useForm, Controller } from "react-hook-form";

const LoginForm = (props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const onSubmit = (data) => {
    // Handle form submission
    console.log("data", data);
  };
  return (
    <SafeAreaView style={{ height: "100%" }}>
      <Logo />
      <View>
        <Controller
          control={control}
          render={({ field }) => (
            <FormInput
              title="Username"
              value={field.value}
              onChange={field.onChange}
              secret={false}
            />
          )}
          name="username"
          rules={{ required: "Name is required" }}
        />
        <ErrorMessage
          error={errors?.username}
          message={errors?.username?.message}
        />

        <Controller
          control={control}
          render={({ field }) => (
            <FormInput
              placeholder="Enter your password"
              secret={true}
              value={field.value}
              onChange={field.onChange}
            />
          )}
          name="password"
          rules={{
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters long",
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
        formToggle={props.formToggle}
        setFormToggle={props.setFormToggle}
      />
    </SafeAreaView>
  );
};

export default LoginForm;
