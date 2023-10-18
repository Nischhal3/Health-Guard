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

module.exports = { testData };
