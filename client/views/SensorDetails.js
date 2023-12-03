import React, { useContext, useEffect, useState } from "react";
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
import { MainContext } from "../MainContext";
import { baseUrl } from "../utils/Variables";
import { io } from "socket.io-client";
import {
  getAllNotification,
  postNotification,
} from "../services/NotificationApi";

const temperatureWarning = (temperature) =>
  temperature < 15 || temperature > 25;

const warningMessage = (temperature) =>
  temperature > 23
    ? `Too hot ${temperature} degree celcious!`
    : temperature < 15
    ? `Too cold ${temperature} degree celcious!`
    : undefined;

export const SensorDetails = ({ navigation, route }) => {
  const { user } = useContext(MainContext);
  const [convertedValue, setConvertedValue] = useState(0);
  const { data } = route.params;
  const [temp, setTemp] = useState(0);
  const minTemp = 15;
  const maxTemp = 32;
  const progressBarMinValue = 1;
  const progressBarMaxValue = 100;

  useEffect(() => {
    setTemp(data.temperature);
  }, [data]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllNotification(user.token);
        const notifications = await response.json();

        const _temperatureWarning = temperatureWarning(data.temperature);

        const notificationData = {
          location: data.location,
          sensor_reading: data.temperature,
          type: data.sensor,
          userId: user.data.id,
          warning: warningMessage(data.temperature),
        };

        if (_temperatureWarning) {
          /**
           * if notification is empty no checking shall be done
           */
          if (notifications.status === 409) {
            await postNotification(user.token, notificationData);
            return;
          } else {
            const timeDiffrenceIsMoreThanHour = checkTimeDifference(
              notifications,
              data.location,
              data.sensor,
              user.data.id
            );
            /**
             * Conditions to execute this block
             * temperature should be below 15 or above 23
             * Sensor in same location of same type with same user id will wait 1 hour to send next notification
             *
             */
            console.log(timeDiffrenceIsMoreThanHour);
            if (timeDiffrenceIsMoreThanHour) {
              await postNotification(user.token, notificationData);
            }
          }
        }
      } catch (error) {
        console.error("Error posting data:", error);
      }
    };
    // Set up an interval to fetch data every 30 minutes
    const intervalId = setInterval(() => {
      fetchData();
    }, 3000);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

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
    sendDataToServer("increase");
  };
  const decreaseTemp = () => {
    if (temp < 16) {
      return;
    }
    setTemp(temp - 1);
    sendDataToServer("decrease");
  };

  const sendDataToServer = (action) => {
    const socket = io(baseUrl, {
      auth: { token: user.token },
    });

    // Emit the data to the server
    socket.emit("tempData", {
      temperature: temp,
      location: "location",
      action: action,
    });

    socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
    });

    return () => {
      socket.disconnect();
    };
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
        <SensorData
          imageIcon={humidityIcon}
          size={30}
          height={30}
          data={data}
        />
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

const checkTimeDifference = (notifications, location, type, userId) => {
  for (const notification of notifications) {
    if (
      notification.location === location &&
      notification.userId === userId &&
      notification.type === type
    ) {
      const notificationDate = new Date(notification.date);
      const currentDate = new Date();

      if (!isNaN(notificationDate.getTime())) {
        const timeDifferenceInMilliseconds = currentDate - notificationDate;
        const timeDifferenceInHours =
          timeDifferenceInMilliseconds / (1000 * 60 * 60);

        if (timeDifferenceInHours >= 3) {
          return true;
        }
      } else {
        console.log("Invalid date format");
      }
    }
  }
  return false;
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
