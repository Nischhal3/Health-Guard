const fetchData = async () => {
  try {
    const response = await fetch("https://98d5-195-148-98-153.ngrok-free.app/");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const jsonData = await response.json();
    return jsonData
  } catch (error) {
    console.error('Error fetching data:', error.message);
  }
};

export { fetchData }