import Adafruit_DHT
import paho.mqtt.client as mqtt
import subprocess
import base64
import time
import json
import threading

# receive topic
topic_receive_temp = "temp_data"

# send topic
topic_send_image = "mqtt_image"
topic_send_temp = "mqtt_temp"

pin = 17

def on_connect(client, userdata, flags, rc):
    print(f"Connected with result code {rc}")
    client.subscribe(topic_receive_temp)

def on_message(client, userdata, msg):
    print(f"Received message on topic {msg.topic}")

    try:
        payload_str = msg.payload.decode('utf-8')
        print(f"Message: {payload_str}")

    except UnicodeDecodeError:
        print("Payload is binary, not decoding as UTF-8")

def capture_and_publish_image(client):
    while True:
        # Capture image using fswebcam
        subprocess.run(["fswebcam", "-r", "640x480", "--no-banner", "output.jpg"])

        # Read the image file
        with open("output.jpg", "rb") as image_file:
            image_data = image_file.read()
            base64_image = base64.b64encode(image_data).decode('utf-8')

        # Publish image data to MQTT
        image_payload = {
            "image_url": base64_image,
            "sensor": "camera",
            "location": "living_room"
        }
        client.publish(topic_send_image, payload=json.dumps(image_payload), qos=0, retain=False)

        time.sleep(10)  # Publish every 10 seconds

def read_and_publish_temperature(client, pin):
    while True:
        humidity, temperature = Adafruit_DHT.read_retry(Adafruit_DHT.DHT11, pin)

        if humidity is not None and temperature is not None:
            temp_data = {
                "temperature": round(temperature, 2),
                "humidity": round(humidity, 2),
                "sensor": "temperature",
                "location": "living_room"
            }

            temp_json = json.dumps(temp_data)
            print(temp_json)

            # Publish temperature and humidity data to MQTT
            client.publish(topic_send_temp, payload=temp_json, qos=0, retain=False)
        else:
            print('Failed to retrieve data from DHT11 sensor')

        time.sleep(10)  # Sleep for 10 seconds before reading again

# Read MQTT configuration from config.json
with open("config.json", "r") as config_file:
    config = json.load(config_file)

broker_address = config["mqttBrokerAddress"]
username = config["mqttUsername"]
password = config["mqttPassword"]
port = config["mqttPort"]

client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message

client.username_pw_set(username, password)
client.connect(broker_address, port, 60)
client.loop_start()

# Create threads for each function
capture_thread = threading.Thread(target=capture_and_publish_image, args=(client,))
temperature_thread = threading.Thread(target=read_and_publish_temperature, args=(client, pin))

# Start both threads
capture_thread.start()
temperature_thread.start()

# Wait for both threads to finish
capture_thread.join()
temperature_thread.join()

print("Exiting program.")