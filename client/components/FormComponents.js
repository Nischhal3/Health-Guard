import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Colors from "../utils/Colors";

const FormInput = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{props.title}</Text>
      <TextInput style={styles.input} />
    </View>
  );
};

const FormButton = (props) => {
  const handleButtonPress = () => {
    if (props.navigation === undefined) {
      return;
    }
    props.navigation.navigate("Home");
  };

  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
        <Text style={styles.buttonText}>{props.title}</Text>
      </TouchableOpacity>
    </View>
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
    marginLeft: 40,
  },
  text: {
    marginLeft: 10,
    marginTop: 20,
    fontSize: 20,
    color: Colors.white,
  },
  input: {
    backgroundColor: Colors.white,
    width: "80%",
    borderRadius: 15,
    height: 40,
    marginTop: 15,
    marginBottom: 15,
  },
  buttonContainer: {
    display: "flex",
    alignItems: "center",
    marginTop: 25,
    marginRight: 50,
  },
  button: {
    backgroundColor: Colors.secondary,
    alignItems: "center",
    padding: 10,
    borderRadius: 15,
    width: "40%",
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
    marginRight: 45,
    fontSize: 18,
  },
});

export { FormInput, FormButton, FormNavigationText };
