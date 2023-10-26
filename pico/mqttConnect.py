import machine
import time
from umqtt.simple import MQTTClient
# 
# LED = machine.Pin('LED', Pin.OUT) 
mqtt_server = '192.168.0.103'
client_id = 'PicoW'
    
def mqtt_connect():
    client = MQTTClient(client_id, mqtt_server, keepalive=3600)
    client.connect()
    print('Connected to %s MQTT Broker'%(mqtt_server))
    return client

def reconnect():
    print('Failed to connect to the MQTT Broker. Reconnecting...')
    time.sleep(5)
    machine.reset()
    

    

