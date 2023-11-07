import paho.mqtt.client as mqtt
import subprocess
import base64
import time
import json

topic_send = "mqtt"
topic_receive = "healthGuard"

def on_connect(client, userdata, flags, rc):
    print(f"Connected with result code {rc}")
    client.subscribe(topic_receive)

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
        client.publish(topic_send, payload=base64_image, qos=0, retain=False)

        time.sleep(20)  # Publish every 60 seconds

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

capture_and_publish_image(client)
