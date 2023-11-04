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

# MQTT setup In Rasberry Pi 4

- sudo apt-get install python3-pip
- sudo apt-get install python3-paho-mqtt
- sudo nano /etc/mosquitto/mosquitto.conf
- Edit file
  - listener 1883 0.0.0.0
  - allow_anonymous false
  - password_file /etc/mosquitto/passwd
- Set username and password for MQTT
  - sudo mosquitto_passwd -c /etc/mosquitto/passwd your_username follwed by password
- sudo service mosquitto restart
- sudo service mosquitto enable
- sudo service mosquitto status [Should be active]
