import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Colors from "../utils/Colors";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

const FormInput = (props) => {
  const { title, value, onChange, secret } = props;
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChange}
        secureTextEntry={secret}
      />
    </View>
  );
};

const FormButton = (props) => {
  const { title, submit } = props;
  const handleButtonPress = () => {
    if (props.navigation === undefined) {
      return;
    }
    props.navigation.navigate("Home");
  };

  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.button} onPress={submit}>
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const ErrorMessage = (props) => {
  const { error, message } = props;
  return (
    <View>{error && <Text style={styles.errorText}>{message}</Text>}</View>
  );
};
const FormNavigationText = (props) => {
  const handleTextPress = () => {
    props.setFormToggle(!props.formToggle);
  };
  return (
    <TouchableOpacity onPress={handleTextPress}>
      <Text style={styles.underlineText}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 20,
  },
  text: {
    marginLeft: 10,
    marginTop: 10,
    fontSize: 20,
    color: Colors.white,
  },
  input: {
    backgroundColor: Colors.white,
    width: wp("85%"),
    borderRadius: 15,
    height: 40,
    marginTop: 15,
    marginBottom: 5,
  },
  buttonContainer: {
    display: "flex",
    alignItems: "center",
    marginTop: 15,
  },
  button: {
    backgroundColor: Colors.secondary,
    alignItems: "center",
    padding: 10,
    borderRadius: 15,
    width: wp("40%"),
  },
  buttonText: {
    color: Colors.white,
    fontSize: 20,
  },
  underlineText: {
    textDecorationLine: "underline",
    color: Colors.white,
    alignSelf: "center",
    marginTop: 20,
    fontSize: 18,
  },
  errorText: {
    color: "red",
    marginBottom: 12,
  },
});

export { FormInput, FormButton, FormNavigationText, ErrorMessage };
