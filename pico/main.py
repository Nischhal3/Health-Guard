from wifi import init_wifi
from serve_webpage import serve_webpage
from mqttConnect import mqtt_connect
from mqttConnect import reconnect
from temp import get_temp
import time

LED = machine.Pin('LED',machine.Pin.OUT)
sensor = get_temp()
topic_pub = b'temperature'
topic_msg = b'temp: %s C'%sensor

init_wifi()
serve_webpage()
# 
# try:
#     client = mqtt_connect()
# except OSError as e:
#     reconnect()
#     
# while True:
#     if sensor != '':
#         LED.on()
#         print('data publishing %s'%topic_msg)        
#         client.publish(topic_pub, topic_msg)        
#         time.sleep(5)       
#        
#     else:
#         pass
#     
