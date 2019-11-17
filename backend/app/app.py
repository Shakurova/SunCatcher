import os
import time
import requests

from datetime import datetime
from dateutil.parser import parse

from flask import Flask, request, jsonify
from flask_pymongo import PyMongo

application = Flask(__name__)

application.config["MONGO_URI"] = 'mongodb://' + os.environ['MONGODB_USERNAME'] + \
                                  ':' + os.environ['MONGODB_PASSWORD'] + '@' + os.environ['MONGODB_HOSTNAME']\
                                  + ':27017/' + os.environ['MONGODB_DATABASE']

mongo = PyMongo(application)
db = mongo.db


# HELPERS

def round_timebucket(tstmp):
    minute_rounded = tstmp.minute - (tstmp.minute % 10)
    tb = tstmp.strftime("%Y-%m-%d %H:{}:00").format(minute_rounded)
    return datetime.strptime(tb, "%Y-%m-%d %H:%M:%S")


def is_outdoors(lat, lon):
    """Decide if the person is inside or outside"""
    response = requests.get("https://nominatim.openstreetmap.org/reverse?format=json&lat="
                            + str(lat) + "&lon=" + str(lon) + "&zoom=18&addressdetails=1")
    bbox = list(map(float, response.json()["boundingbox"]))
    return bbox[0] <= lat <= bbox[1] and bbox[2] <= lon <= bbox[3]


### LENA WEATHER ###

def parse_time(date, time):
    print('Date time: ', date, time)
    time_now = parse(f'{date} {time}')
    unix_time = round(time_now.timestamp())
    return time_now, unix_time


def get_weather(lat, lng, date, time):
    """
        For a given time and date, return the textual description of the weather.
        https://darksky.net/dev/docs#forecast-request
    """

    unix_time = parse_time(date, time)[1]
    response = requests.get(f'https://api.darksky.net/forecast/aec3225ddd6f2dc01389770d446297d3/{lat},{lng},{unix_time}?exclude=flags')
    results = response.json()
    # print(results)

    if results['currently']['cloudCover'] < 0.50:
        return 1
    else:
        return 0, results['currently']['cloudCover']


def get_light(lat, lng, date=False, time=False):
    """
        For a given time and date, return False for night and True for day.
        https://sunrise-sunset.org/api
    """

    if not date:
        date = datetime.now().date()
    else:
        date = parse(f'{date}').date()

    if not time:
        time = datetime.now().time()
    else:
        time = parse(f'{time}').time()


    date_time = parse(f'{date} {time}')

    response = requests.get(f'https://api.sunrise-sunset.org/json?lat={lat}&lng={lng}&date={date}')
    results = response.json()["results"]

    sunrise_time, sunset_time = results["sunrise"], results["sunset"]
    sunrise_conv = parse(f'{date} {sunrise_time}')
    sunset_conv = parse(f'{date} {sunset_time}')

    print(date_time, ':', sunrise_conv, '---', sunset_conv)

    if sunrise_conv < date_time < sunset_conv:
        return 1
    else:
        return 0


def get_weather_light(lat, lng, date, time):
    """
        Given lat, lng, date, time returns json
    """

    weather = get_weather(lat, lng, date, time)
    weather_code, weather_description = weather[0], weather[1]
    daylight_code = get_light(lat, lng, date, time)

    return {
            "weather_code": weather_code,
            "weather_description": weather_description,
            "daylight_code": daylight_code
            }


def create_new_walk(time_bucket, user_id, lat, lon):
    walk = {
        'time_bucket': time_bucket,
        'duration': 0,
        'user_id': user_id,
        'ltd': lat,
        'lng': lon,

    }

    # ToDo: Call api to get weather, weather_description, daylight
    date = time_bucket.date().strftime("%Y-%m-%d")
    time = time_bucket.time().strftime("%H:%M:%S")
    weather_details = get_weather_light(lat, lon, date, time)

    walk.update(weather_details)

    return walk

#### API #####

@application.route('/')
def index():
    return jsonify(
        status=True,
        message='Welcome to SunCatcher!'
    )


@application.route('/activity', methods=['POST'])
def update_user_activity():
    data = request.get_json(force=True)

    timestamp = data['timestamp']  # "2019-07-16 13:10:00"
    user_id = data['user_id']  # misha
    lat = data['lat']  # 60
    lon = data['lon']  # 70

    is_outdoors_flag = is_outdoors(lat, lon)
    if not is_outdoors_flag:
        return jsonify(
            status=True,
            message='User location saved successfully!'
        ), 201

    # Get timebucket
    timestamp = datetime.strptime(timestamp, "%Y-%m-%d %H:%M:%S")
    time_bucket = round_timebucket(timestamp)

    # Find user walk
    user_walk = db.walk.find_one(
        {
            'user_id': user_id,
            'time_bucket': time_bucket
        }
    )

    if user_walk is None:
        user_walk = create_new_walk(time_bucket, user_id, lat, lon)

    user_walk['duration'] += 1
    user_walk['duration'] = min(user_walk['duration'], 10)

    db.walk.update_one(
        {
            'user_id': user_id,
            'time_bucket': time_bucket
        }, {'$set': user_walk},  upsert=True
    )

    return jsonify(
        status=True,
        message='User location saved successfully!'
    ), 201


if __name__ == "__main__":
    ENVIRONMENT_DEBUG = os.environ.get("APP_DEBUG", True)
    ENVIRONMENT_PORT = os.environ.get("APP_PORT", 5000)
    application.run(host='0.0.0.0', port=ENVIRONMENT_PORT, debug=ENVIRONMENT_DEBUG)
