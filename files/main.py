import time
import sqlite3
from contextlib import closing
import Adafruit_DHT

DHT_SENSOR = Adafruit_DHT.DHT22
DHT_PIN = 4

interval = 60.0
debug = False

connection = sqlite3.connect("data.db")

sql = "INSERT INTO data(temperature, humidity) VALUES(?, ?)"

while True:
    humidity, temperature = Adafruit_DHT.read_retry(DHT_SENSOR, DHT_PIN)

    if debug:
        localtime = time.localtime()
        t = time.strftime("%I:%M:%S %p", localtime)
        print(t + "\t"+ "Humidity: " + str(humidity) + "% Ext Temp: " + str(temperature) + "C")

    with closing(connection.cursor()) as cursor:
        cursor.execute(sql, (temperature, humidity))
        connection.commit()
    time.sleep(interval)
