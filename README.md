# HealthGuard

# Table of Content

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Dependencies](#dependencies)
- [Setup](#setup)
- [Getting Started](#getting-started)

## Introduction

Welcome to HealthGuard, a powerful and secure IoT data monitoring and notification system. This project is designed to seamlessly retrieve sensor data connected to a Raspberry Pi using the MQTT protocol, ensuring efficient communication and real-time updates.

- **MQTT Protocol:** Utilizing the MQTT protocol, our system establishes a reliable and lightweight communication channel between the Raspberry Pi and connected devices. This enables the seamless transmission of sensor data.

- **OpenSSL Security:** We prioritize the security of your data. OpenSSL is integrated into our system to ensure end-to-end encryption, safeguarding the confidentiality and integrity of the transmitted information.

- **Node.js Backend:** The project incorporates a robust Node.js backend, acting as the central hub for data processing and management. It efficiently handles incoming sensor data, performs necessary computations, and securely stores relevant information in a MySQL database.

- **MySQL Database:** All notifications and critical information are stored in a MySQL database, providing a structured and organized repository for historical and real-time data. This allows for easy retrieval and analysis of sensor readings and system events.

- **React Native Front End:** HealthGuard comes with a feature-rich React Native front-end application. Leverage the power of React Native to create a user-friendly and responsive interface for monitoring and interacting with your IoT data. The React Native app ensures a seamless experience for users on various devices, offering real-time updates and a smooth interface.

- **Raspberry Pi Integration:** On the Raspberry Pi side, we use Python scripts to retrieve and publish data to and from the server. This integration enables HealthGuard to tap into the potential of Raspberry Pi's sensors and bring real-world data into the system. The Python code facilitates a robust connection between the physical sensors and the centralized server, ensuring a reliable flow of information.

## Prerequisites

Before you start working with the React Native application, Node.js backend, and Raspberry Pi, ensure that your development environments are set up correctly. Follow these steps to install the necessary tools:

### React Native Front End

#### Node.js and npm

React Native requires Node.js and npm (Node Package Manager). If you haven't installed them yet, download and install from [nodejs.org](https://nodejs.org/).

#### React Native CLI

Install the React Native Command Line Interface (CLI) globally using npm command in terminal:

```bash
npm install -g react-native-cli
```

#### Mobile Setup

Install Expo Go from Play Store or App Store.

### Raspberry Pi

#### Sensor requirement

DHT11 Temperature and Humidity sensor, breadboard, wires, OLED display & camera module (webcam).

#### Python

Python should be installed by default. Ensure Python is installed on your Raspberry Pi. You can check the version using this command in terminal :

```bash
python --version
```

For Openssl and MQTT installation execute these command in Raspberry Pi terminal.

```bash
sudo apt-get install openssl
sudo apt-get install mosquitto
```

Start MQTT:

```bash
sudo service mosquitto start
```

Enable MQTT on startup:

```bash
sudo service mosquitto enable
```

Check MQTT on status:

```bash
sudo service mosquitto status
```

## Dependencies

### React Native Front End

- **@react-native-async-storage/async-storage:** Asynchronous storage for React Native applications.
- **@react-navigation/native:** Navigation library for React Native applications.
- **@react-navigation/stack:** Stack navigator for React Navigation.
- **expo:** Framework and tools for building React Native applications.
- **expo-status-bar:** Expo component for managing the status bar.
- **react:** React library.
- **react-hook-form:** Library for flexible and efficient form validation in React.
- **react-native:** React Native framework.
- **react-native-circular-progress:** Circular progress component for React Native.
- **react-native-radio-buttons-group:** Radio buttons group component for React Native.
- **react-native-responsive-screen:** Library for creating responsive designs in React Native.
- **react-native-svg:** Library for using SVG in React Native.
- **react-native-toast-message:** Toast messages for React Native applications.
- **react-native-video:** Video component for React Native.
- **socket.io-client:** Client library for Socket.IO.
- **@babel/core:** Core of the Babel compiler.

### Node js backend

- **bcrypt:** Library for hashing passwords.
- **cors:** Middleware for enabling Cross-Origin Resource Sharing in Express.
- **dotenv:** Module for loading environment variables from a .env file.
- **express:** Web framework for Node.js.
- **express-validator:** Middleware for request validation in Express.
- **jsonwebtoken:** Library for generating JSON Web Tokens (JWT).
- **mqtt:** MQTT library for Node.js.
- **mysql2:** MySQL library for Node.js.
- **passport:** Authentication middleware for Node.js.
- **passport-jwt:** Passport strategy for handling JWT-based authentication.
- **passport-local:** Passport strategy for handling local (username and password) authentication.
- **sharp:** High-performance image processing library for Node.js.
- **socket.io:** Library for real-time web applications with bidirectional communication.
- **ws:** WebSocket library for Node.js.

### Python Dependencies (Raspberry Pi)

The Python code running on your Raspberry Pi utilizes the following dependencies:

- **Adafruit-DHT:** Python library for DHT temperature and humidity sensors.
- **paho-mqtt:** MQTT library for Python.
- **adafruit-blinka:** CircuitPython (Blinka) compatibility library for single-board computers.
- **Pillow:** Python Imaging Library (PIL) fork for working with images.
- **adafruit-circuitpython-ssd1306:** CircuitPython library for SSD1306-based OLED displays.

## Setup

### Clone our repository with command:

```bash
git clone git@github.com:Nischhal3/Health-Guard.git
```

### For NPM package installation go to cloned folder & execute these commands:

```bash
cd client
npm install
cd ../server
npm install
```

### For Rasberry pi setup

Copy folder named ras-pi-4 and into you Rasberry Pi environment. Generate openssl certificates ca.crt server.crt & server.key. You can follow commands from [OpenSSL guide](https://openest.io/en/services/mqtts-how-to-use-mqtt-with-tls/). Those certificates should be generated inside ras-pi-4 or you manually need to change path for those certificates in mqtt.py.

#### Permissions

Provide these permission -rw-r--r-- for current user to these files ca.crt server.crt & server.key. Permission example for user iot

- -rw-r--r-- 1 iot iot 1704 Dec 2 15:29 server.key
- -rw-r--r-- 1 iot iot 1350 Dec 2 15:29 server.crt
- -rw-r--r-- 1 iot iot 1342 Dec 2 15:29 ca.crt

Copy ca.crt server.crt & server.key in location /etc/mosquitto/certs and provide these permissions for mosquitto

- -rw-r--r-- 1 mosquitto mosquitto 1342 Dec 2 15:29 ca.crt
- -rw-r--r-- 1 mosquitto mosquitto 1350 Dec 2 15:29 server.crt
- -rw-r----- 1 mosquitto mosquitto 1704 Dec 2 15:29 server.key

Make a directory called certs under folder server and copy these files ca.crt server.crt & server.key inside that folder.

#### MQTT configuration

To setup MQTT username & password execute following command:

```bash
sudo mosquitto_passwd -c /etc/mosquitto/passwd
```

And add username follwed by password. This will set MQTT for username and password authetication.

Make a file name config.json inside folder ras-pi-4 and add following things:

```conf
{
  "mqttBrokerAddress": "your_rasberry_pi_ip_address",
  "mqttUsername": "your_username",
  "mqttPassword": "your_password",
  "mqttPort": 8883
}
```

To enable MQTT for login & openssl authentication execute following command:

```bash
sudo nano /etc/mosquitto/mosquitto.conf
```

Add following content in that file

```conf
pid_file /run/mosquitto/mosquitto.pid

persistence true
persistence_location /var/lib/mosquitto/

log_dest file /var/log/mosquitto/mosquitto.log

include_dir /etc/mosquitto/conf.d
listener 8883

cafile /etc/mosquitto/certs/ca.crt

certfile /etc/mosquitto/certs/server.crt

keyfile /etc/mosquitto/certs/server.key

require_certificate true
use_identity_as_username true
allow_anonymous false
password_file /etc/mosquitto/passwd
```

#### Test MQTT Configuration

To test mqtt as subscriber execute this command:

```bash
sudo /usr/bin/mosquitto_sub -p 8883 --cafile /etc/mosquitto/certs/ca.crt --cert /etc/mosquitto/certs/server.crt --key /etc/mosquitto/certs/server.key -h mqtt_ip_address -t world -u username -P password
```

To test mqtt as publisher execute this command:

```bash
sudo /usr/bin/mosquitto_pub -p 8883 --cafile /etc/mosquitto/certs/ca.crt --cert /etc/mosquitto/certs/server.crt --key /etc/mosquitto/certs/server.key -h mqtt_ip_address -m hello -t world -u username -P password
```

Replace mqtt_ip_address, username and password with your configured ip address, username and password.
If everything configured correctly then you will see 'hello' message poped up in subscriber terminal.

If it's not working as intended then check MQTT log with command:

```bash
sudo cat /var/log/mosquitto/mosquitto.log
```

#### Virtual Environment Setup for Python

To set up the Python virtual environment on your Raspberry Pi, execute these commands:

1. Create a virtual environment:

```bash
python3 -m venv path/to/venv
```

2. Activate the virtual environment:

```bash
source path/to/venv/bin/activate
```

3. Install the required Python packages:

```bash
pip install Adafruit-DHT
pip install paho-mqtt
pip install adafruit-blinka
pip install Pillow
pip install adafruit-circuitpython-ssd1306
```

### Database Setup

Create MySql database in any server of your choice and Execute following queries in your database

```query
CREATE TABLE user (
id INT AUTO_INCREMENT PRIMARY KEY,
username VARCHAR(255) NOT NULL,
email VARCHAR(255) UNIQUE NOT NULL,
password VARCHAR(255) NOT NULL
);

CREATE TABLE notification (
sensor_id INT AUTO_INCREMENT PRIMARY KEY,
date TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
location VARCHAR(255),
sensor_reading VARCHAR(255),
type VARCHAR(255),
warning TEXT,
userId INT,
FOREIGN KEY (userId) REFERENCES user(id) ON DELETE CASCADE,
);
```

### Server Setup

Create file .env inside server folder and add following content to it:

```env
DB_HOST='your_db_host'
DB_USER='your_db_user'
DB_PASS='your_db_password'
DB_NAME='your_db_name'
JWT_SECRET='your_randomly_generated_chars'
mqttUsername='mqtt_user'
mqttPassword = 'mqtt_password'
mqttBrokerAddress = 'your_rasberry_pi_ip_address'
mqttBrokerPort = 8883
protocol = 'mqtts'
```

### Front End Setup

In file client\utils\Variables.js edit this url :export const baseUrl = "http://your_pc_ip_address:3000";

## Getting Started

After everything is configured. Go to folder HealthGuard [Main repositiry].Open two teminals execute following commands:

### First Terminal

```bash
cd client
npm start
```

### Second Terminal

```bash
cd server
npm start
```

# Enjoy :)
