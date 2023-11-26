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

# Command is used to activate a virtual environment

- python3 -m venv path/to/venv
- source path/to/venv/bin/activate
- pip install Adafruit-DHT
- pip install paho-mqtt

# Start MQTT

- Find running application on port 1883 : netstat -an | findstr "1883"

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

# Activate Webcam In Terminal

- ffmpeg -f video4linux2 -i /dev/video0 -r 30 -s 640x480 -c:v h264 -t 15 output.mp4

  - f video4linux2: Specifies the input format as Video4Linux2.
  - i /dev/video0: Specifies the input device (your USB webcam).
  - r 30: Sets the frame rate to 30 frames per second (adjust as needed).
  - s 640x480: Sets the video resolution to 640x480 pixels (adjust as needed).
  - c:v h264: Specifies the video codec as H.264.
  - t 10: Sets the duration of the video capture to 10 seconds (adjust as needed).
    output.mp4: Specifies the output file name and format (adjust as needed).

# Container

- start docker: sudo docker start 5eb46b54c3af
- Run the docker in interactive mode:: sudo docker run -it tpmcourse:latest
- sudo docker exec 5eb46b54c3af ls /home/
- copy file from docker to pi: sudo docker cp 5eb46b54c3af:/secret /home/iot/
