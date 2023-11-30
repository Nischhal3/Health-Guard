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

const postNotification = async (token, data) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  };

  return await fetch(`${baseUrl}/notification`, options);
};

const deleteNotificationById = async (id, token) => {
  const options = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return await fetch(`${baseUrl}/notification/${id}`, options);
};

const deleteAllNotification = async (token) => {
  const options = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return await fetch(`${baseUrl}/notification`, options);
};

export {
  getAllNotification,
  postNotification,
  deleteNotificationById,
  deleteAllNotification,
};
