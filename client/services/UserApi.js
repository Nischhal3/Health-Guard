import { baseUrl } from "../utils/Variables";
import AsyncStorage from "@react-native-async-storage/async-storage";

const register = async (userData) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  };
  const response = await fetch(`${baseUrl}/register`, options);
  return await response.json();
};

const login = async (userData) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  };
  const response = await fetch(`${baseUrl}/login`, options);
  return await response.json();
};

const saveUserDataToAsyncStorage = async (userData) => {
  try {
    const user = JSON.stringify(userData);
    await AsyncStorage.setItem("user", user);
    console.log("User data saved successfully in AsyncStorage");
  } catch (error) {
    console.error("Error saving user data in AsyncStorage:", error);
  }
};

const fetchUserDataFromAsyncStorage = async (setUser) => {
  try {
    const user = await AsyncStorage.getItem("user");

    if (user) {
      const userObject = JSON.parse(user);
      console.log("User data retrieved successfully from AsyncStorage!");
      setUser(userObject);
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error retrieving user data from AsyncStorage!", error);
    return null;
  }
};

const deleteUserDataFromAsyncStorage = async () => {
  try {
    await AsyncStorage.removeItem("user");
    console.log("User data deleted successfully from AsyncStorage!");
  } catch (error) {
    console.error("Error deleting user data from AsyncStorage!", error);
  }
};

export {
  register,
  login,
  saveUserDataToAsyncStorage,
  fetchUserDataFromAsyncStorage,
  deleteUserDataFromAsyncStorage,
};
