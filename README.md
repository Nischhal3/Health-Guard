# Health-Guard

# Installation

    - clone repository Health-Guard
    - cd client
    - npm install

# Start Application

    - install Expo Go from Play Store or App Store
    - in client directory run command : npm expo start
    - Scan the QR code & App is ready to use :)

# Query

CREATE TABLE user (
id INT AUTO_INCREMENT PRIMARY KEY,
username VARCHAR(255) NOT NULL,
email VARCHAR(255) UNIQUE NOT NULL,
password VARCHAR(255) NOT NULL
);

# Start MQTT

- With Admin privilage run : net start mosquitto
- check status: sc query mosquitto
- publish message: "C:\Program Files\mosquitto\mosquitto_pub" -h localhost -t test_topic -m "Hello, MQTT"
- subscribe message: "C:\Program Files\mosquitto\mosquitto_sub.exe" -h localhost -t test_topic
