import { baseUrl } from "../utils/Variables";

// Function for user registration
const register = async (userData) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  };
  return await fetch(`${baseUrl}/register`, options);
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

// Fetching user token from async storage
const getToken = async () => {
  //return await AsyncStorage.getItem("userToken");
};

export { register, login, getToken };
