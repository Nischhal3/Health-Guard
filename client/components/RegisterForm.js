import React from "react";
import { Dimensions, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import {
  ErrorMessage,
  FormButton,
  FormInput,
  FormNavigationText,
} from "./FormComponents";
import Logo from "../views/Logo";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useForm, Controller } from "react-hook-form";
const RegisterForm = (props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const onSubmit = (data) => {
    // Handle form submission
    console.log("data", data);
  };
  return (
    <SafeAreaView style={{ height: "100%" }}>
      <ScrollView>
        <Logo />
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
              title="E-mail"
              value={field.value}
              onChange={field.onChange}
              secret={false}
            />
          )}
          name="email"
          rules={{ required: "Email is required" }}
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
        <Controller
          control={control}
          render={({ field }) => (
            <FormInput
              title="Confirm Password"
              placeholder="Enter your password"
              secret={true}
              value={field.value}
              onChange={field.onChange}
            />
          )}
          name="confirmPassword"
          rules={{
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters long",
            },
          }}
        />
        <ErrorMessage
          error={errors?.confirmPassword}
          message={errors?.confirmPassword?.message}
        />
        <FormButton title="Register" submit={handleSubmit(onSubmit)} />
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
