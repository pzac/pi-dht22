from flask import Flask,json
from flask import render_template
import sqlite3

app = Flask(__name__, template_folder="./templates")

@app.route("/")
def index():
    try:
        conn = sqlite3.connect("data.db")
        cursor = conn.cursor()
        query = "SELECT " + fields() + " FROM data ORDER BY time DESC LIMIT 1"
        cursor.execute(query)
        rows = cursor.fetchall()
        data = normalize_row(rows[0])
        return render_template("index.html", data=data)
    except sqlite3.Error as error:
        return error
    finally:
        if (conn):
            conn.close()

@app.route("/last-hour.json")
def last_hour():
    return json.dumps(rows_where("time >= datetime('now', '-1 hour')"))

@app.route("/last-24-hours.json")
def last_24_hours():
    return json.dumps(rows_where("time >= datetime('now', '-1 day') AND (id % 12) = 0"))

@app.route("/last-week.json")
def last_week():
    return json.dumps(rows_where("time >= datetime('now', '-7 days') AND (id % 120) = 0"))

def query_to_dataset(sql):
    data = {'time': [], 'temperature': [], 'humidity': []}
    try:
        conn = sqlite3.connect("data.db")
        cursor = conn.cursor()
        cursor.execute(sql)
        rows = cursor.fetchall()
        for row in rows:
            row = normalize_row(row)

            data['time'].append(row['time'])
            data['temperature'].append(row['temperature'])
            data['humidity'].append(row['humidity'])
        return data
    except sqlite3.Error as error:
        return error
    finally:
        if (conn):
            conn.close()


def rows_where(conditions):
    sql = "SELECT " + fields() + " FROM data WHERE " + conditions + " ORDER BY time DESC"
    return query_to_dataset(sql)

def fields():
    return "id, datetime(time, 'localtime'), temperature, humidity"

def normalize_row(row):
    humidity = row[3]

    if not humidity:
        humidity = None
    elif humidity > 100:
        humidity = None
    elif humidity < 0:
        humidity = None
    else:
        humidity = round(humidity, 1)


    out = {
        'time': row[1],
        'temperature': round(row[2], 1),
        'humidity': humidity
    }

    return out

if __name__ == "__main__":
    app.run(host='0.0.0.0')
