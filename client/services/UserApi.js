import { baseUrl } from "../utils/Variables";

// Function for user registration
export const register = async (userData) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  };
  console.log("options", options);
  return await fetch(`${baseUrl}/register`, options);
};
