import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Colors from "../utils/Colors";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import Headers from "../components/Headers";
import SensorData from "../components/SensorData";
import sunIcon from "../assets/sun.png";
import runningIcon from "../assets/running.png";
import humidityIcon from "../assets/humidity.png";

export const SensorDetails = ({ navigation }) => {
  const [temp, setTemp] = useState(18);
  // temp default value to be replaced by sensor temp value
  const minTemp = 15;
  const maxTemp = 32;
  const progressBarMinValue = 1;
  const progressBarMaxValue = 100;
  const [convertedValue, setConvertedValue] = useState(0);

  useEffect(() => {
    setConvertedValue(
      convertTempValueToBarRange(
        temp,
        minTemp,
        maxTemp,
        progressBarMinValue,
        progressBarMaxValue
      )
    );
  }, [temp]);

  const increaseTemp = () => {
    if (temp === 32) {
      return;
    }
    setTemp(temp + 1);
  };
  const decreaseTemp = () => {
    if (temp < 16) {
      return;
    }
    setTemp(temp - 1);
  };

  return (
    <SafeAreaView style={{ backgroundColor: Colors.primary }}>
      <Headers navDirection="SensorDetails" navigation={navigation} />
      <View style={styles.container}>
        <View style={styles.circleContainer}>
          <AnimatedCircularProgress
            size={200}
            width={30}
            fill={convertedValue}
            rotation={230}
            tintColor={
              temp <= 18
                ? Colors.cold
                : temp > 18 && temp <= 28
                ? Colors.chill
                : Colors.hot
            }
            arcSweepAngle={260}
            backgroundColor={Colors.secondary}
            //style={styles.circle}
            //dashedBackground={{ width: 20, gap: 10 }}
          />
          <Text style={styles.temp}>{`${temp} °C`}</Text>
        </View>
        <Text style={styles.tempText}>Temperature</Text>
        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={[styles.button, styles.btnPlus]}
            onPress={increaseTemp}
          >
            <Text style={styles.btnText}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.btnMinus]}
            onPress={decreaseTemp}
          >
            <Text style={styles.btnText}>-</Text>
          </TouchableOpacity>
        </View>
        <SensorData imageIcon={sunIcon} size={30} height={30} />
        <SensorData imageIcon={humidityIcon} size={30} height={30} />
        <SensorData imageIcon={runningIcon} size={30} height={35} />
      </View>
    </SafeAreaView>
  );
};

const convertTempValueToBarRange = (
  temp,
  minTemp,
  maxTemp,
  progressBarMinValue,
  progressBarMaxValue
) => {
  const convertedValue = Math.round(
    ((temp - minTemp) / (maxTemp - minTemp)) *
      (progressBarMaxValue - progressBarMinValue) +
      progressBarMinValue
  );

  return convertedValue;
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    display: "flex",
    alignContent: "center",
    flexDirection: "column",
    alignItems: "center",
  },
  circleContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  temp: {
    position: "absolute",
    textAlign: "center",
    color: Colors.white,
    fontSize: 35,
    marginTop: 10,
  },
  tempText: {
    position: "absolute",
    textAlign: "left",
    color: Colors.white,
    fontSize: 20,
    marginTop: 160,
  },
  btnContainer: {
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  button: {
    backgroundColor: Colors.white,
    width: "20%",
    height: "120%",
    alignContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  btnPlus: {
    marginRight: 20,
  },
  btnMinus: {
    marginLeft: 20,
  },
  btnText: {
    fontSize: 22,
    fontWeight: "bold",
  },
});
