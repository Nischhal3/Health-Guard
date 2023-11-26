const pool = require("../db");
const promisePool = pool.promise();

const getAllNotification = async () => {
  try {
    const [rows] = await promisePool.query("SELECT * FROM notification");
    return rows;
  } catch (e) {
    console.error("Model getAllNotification, error", e.message);
  }
};

const postNotification = async (data) => {
  try {
    const [rows] = await promisePool.execute(
      "INSERT INTO notification (location, sensor_reading, type, userId,warning) VALUES (?,?,?,?,?)",
      [data.location, data.sensor_reading, data.type, data.userId, data.warning]
    );
    return rows.insertId;
  } catch (e) {
    console.error("Model postNotification news", e.message);
  }
};

const deleteNotificationById = async (notificationId) => {
  try {
    const [rows] = await promisePool.execute(
      "DELETE FROM notification WHERE sensor_id = ?",
      [notificationId]
    );
    return rows.affectedRows;
  } catch (e) {
    console.error("Model deleteNotificationById error", e.message);
  }
};

const deleteAllNotification = async () => {
  try {
    const [result] = await promisePool.execute("DELETE FROM notification");
    return result.affectedRows; // or simply return result
  } catch (e) {
    console.error("Model deleteAllNotification error", e.message);
  }
};

module.exports = {
  getAllNotification,
  postNotification,
  deleteNotificationById,
  deleteAllNotification,
};
