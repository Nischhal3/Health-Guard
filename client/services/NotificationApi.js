import { baseUrl } from "../utils/Variables";

const getAllNotification = async (token) => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  return await fetch(`${baseUrl}/notification`, options);
};

export { getAllNotification };
