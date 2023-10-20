const pool = require("../db");
const promisePool = pool.promise();

const testData = async () => {
  try {
    const [rows] = await promisePool.query("SELECT * FROM random_data");
    console.log("length", rows);
    return rows;
  } catch (e) {
    console.error("error", e.message);
  }
};

const postData = async (data) => {
  try {
    const [rows] = await promisePool.execute(
      "INSERT INTO random_data (name, age) VALUES (?,?)",
      [data.name, data.age]
    );
    console.log("model insert news", rows);
    return rows.insertId;
  } catch (e) {
    console.error("model insert news", e.message);
  }
};
module.exports = { testData, postData };
