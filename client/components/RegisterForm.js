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
import { register } from "../services/UserApi";

const RegisterForm = (props) => {
  const { formToggle, setFormToggle, navigation } = props;
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data) => {
    const userData = {
      username: data.username,
      email: data.email,
      password: data.password,
    };
    try {
      const response = await register(userData);
      console.log(response);
      if (response.status === 200) {
        setFormToggle(!formToggle);
      }
    } catch (error) {
      console.error("Registration error: ", error);
    }
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
            required: { value: true, message: "This field cannot be empty" },
            validate: (value) => {
              const { password } = getValues();
              if (value === password) {
                return true;
              } else {
                return "Passwords do not match.";
              }
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
          formToggle={formToggle}
          setFormToggle={setFormToggle}
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
