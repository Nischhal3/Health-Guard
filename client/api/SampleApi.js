import { baseUrl } from "../utils/Variables";

export const fetchData = async () => {
  try {
    const response = await fetch(`${baseUrl}/sample`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
};
