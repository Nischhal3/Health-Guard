import React, { useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Colors from "../utils/Colors";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import RadioGroup, { RadioButton } from "react-native-radio-buttons-group";

// Hard coded data to be changed later
const radioButtonsData = [
  {
    id: "1",
    label: "Low",
    value: "low",
  },
  {
    id: "2",
    label: "Medium",
    value: "medium",
  },
  {
    id: "3",
    label: "High",
    value: "high",
  },
];

const SensorData = (props) => {
  // Set default value to radio button
  const [radioButton, setRadioButton] = useState(radioButtonsData[0].id);

  function onPressRadioButton(pickedButton) {
    setRadioButton(pickedButton);
  }
  console.log("picked button", radioButton);
  return (
    <View style={styles.container}>
      <Image
        source={props.imageIcon}
        style={{ width: props.size, height: props.height }}
      />
      <RadioGroup
        radioButtons={radioButtonsData}
        onPress={onPressRadioButton}
        selectedId={radioButton}
        containerStyle={styles.radioContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 30,
    backgroundColor: Colors.secondary,
    padding: 15,
    borderRadius: 30,
    width: wp("90%"),
    marginHorizontal: 15,
    margin: 25,
  },
  room: {
    color: Colors.white,
    fontWeight: "400",
    fontSize: 23,
    marginLeft: -20,
  },
  radioContainer: {
    flexDirection: "row",
  },
});
export default SensorData;