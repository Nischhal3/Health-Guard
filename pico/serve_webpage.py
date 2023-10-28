import socket
import machine
from temp import get_temp

led = machine.Pin('LED', machine.Pin.OUT)

def serve_webpage():
#     #Function to load in html page    
    def get_html(html_name):
        # open html_name (index.html), 'r' = read-only as variable 'file'
        with open(html_name, 'w') as file:
           html = file.read()
            
        return html 

    # HTTP server with socket
    addr = socket.getaddrinfo('0.0.0.0', 80)[0][-1]

    s = socket.socket()
    s.bind(addr)
    s.listen(1)

    print('Listening on', addr)
    html = """<!DOCTYPE html>
    <head>
            <title>Pico W</title>
        </head>
        <body>
            <h1>Hello World</h1>
            <p>%s</p>
        </body>
    </html>
    """

    # Listen for connections
    while True:
        try:
            print('while true section running...')
            cl, addr = s.accept()
            print('client connected from ', addr)
            request = cl.recv(1024)         
            
            request = str(request)
            led_on = request.find('/light/on')
            led_off = request.find('/light/off')
            temp = request.find('/temp')
            print('led on = ' + str(led_on))
            print('led off = '+ str(led_off))
            print('temp = '+ str(temp))
            
            if led_on == 6:
                print('led on')
                led.value(1)
                stateis = 'LED is ON'
                
            if led_off == 6:
                print('led off')
                led.value(0)
                stateis = 'LED IS OFF'
            
            if temp == 6:
                print('temperature reading')
                temperature = get_temp()
                print(temperature)
                stateis = "Temperature is {0:.02f}".format(temperature)
            
#             html = get_html('index.html')         
            response = html % stateis
            cl.send('HTTP/1.0 200 OK\r\nContent-type:text/html\r\n\r\n')
            cl.send(response)
            cl.close()        
    
        except OSError as e:
            cl.close()
            print('connection closed')
            
