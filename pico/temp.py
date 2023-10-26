import machine
import time
from oled import OLED

# oled = OLED()
def get_temp():
    #reading temperature from a sensor
    sensor_temp = machine.ADC(4)
    #max voltage of pico is 3.3 and max value of ADC is 65535
    conversion_factor = 3.3/65535
    index=1
    while True:
        reading = sensor_temp.read_u16() * conversion_factor
        temperature = 27-(reading -0.706)/0.001721
#  
#         oled.clear()
#         oled.write('Current Temp', 1,0)
#         oled.write(str(round(temperature,2))+'C',1,20)
#         oled.show()
       
        print(index,' raw data reading :', reading, ' temperature:', temperature)
        index+=1        
        return temperature
