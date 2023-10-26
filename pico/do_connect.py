import network
from time import sleep
from machine import Pin
import socket
import urequests as request
from secrets import *

def do_connect(ssid = secrets['ssid'], psk = secrets['password']):
    wlan = network.WLAN(network.STA_IF)
    wlan.active(True)
    wlan.connect(ssid, psk)
    
    #wait for connection
    max_wait = 10
    while max_wait > 0:
        if wlan.status() < 0 or wlan.status() >= 3:
            break
        max_wait -= 1
        print('waiting for connection...')
        time.sleep(1)

    #handle connection error
    if wlan.status() != 3:
        raise RuntimeError('network connection failed')
    else:
        print('connected')
        status = wlan.ifconfig()
        print('ip =',status[0])
        
    #open socket
    host_addr = socket.getaddrinfo('0.0.0.0',80)[0][-1]

    s = socket.socket()
    s.bind(host_addr)
    s.listen(1)

    print('listening on ',host_addr)
    
    html = """ <!DOCTYPE html>
    <html>
        <head><title>Pico W </title></head>
        <body>
        <h1>Pico W</h1>
        <p>%s</p>
        </body>    
    </html>
    """

    #Listen for connections
    while True:
        try:
            print('while true section running...')
            cl, addr = s.accept()
            print('client connected from ', addr)
            request = cl.recv(1024)
            print(request)
            
            request = str(request)
            led_on = request.find('/light/on')
            led_off = request.find('/light/off')
            print('led on = ' + str(led_on))
            print('led off = '+ str(led_off))
            
            if led_on == 6:
                print('led on')
                led.value(1)
                stateis = 'LED is ON'
                
            if led_off == 6:
                print('led off')
                led.value(0)
                stateis = 'LED IS OFF'
                
            response = html % stateis
            
            cl.send('HTTP/1.0 200 OK\r\nContent-type:text/html\r\n\r\n')
            cl.send(response)
            cl.close()        
    
        except OSError as e:
            cl.close()
            print('connection closed')

        
