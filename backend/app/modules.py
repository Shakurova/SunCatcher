
import json
import requests

import time
from datetime import datetime
from dateutil.parser import parse

from geopy.geocoders import Nominatim

geolocator = Nominatim(user_agent="Junction")

def parse_location(location='Helsinki'):
    loc = geolocator.geocode(location)
    lat, lng = loc.latitude, loc.longitude
    return lat, lng


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

    if 'cloudy' in results['currently']['icon']:
        return 0, results['currently']['icon']
    elif 'clear' in results['currently']['icon']:
        return 1, results['currently']['icon']
    else:
        return 0.5, results['currently']['icon']


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

def main(lat, lng, date, time):
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

if __name__ == "__main__":
    # print(parse_location(location='Helsinki'))
    # print(parse_time(date='2019-11-17', time='1:06:55'))

    # # # Weather?
    # print(get_weather(lat=60.1674086, lng=24.9425683, date='2019-11-17', time='1:6:55'))
    # print(get_weather(lat=60.1674086, lng=24.9425683, date='2019-11-17', time='13:6:55'))
    # print(get_weather(lat=60.1674086, lng=24.9425683, date='2019-11-15', time='13:6:55'))
    #
    # # # Day or night?
    # print(get_light(lat=60.1699, lng=24.9384))
    # print(get_light(lat=60.1699, lng=24.9384, date='2019-07-16', time='9:06:55'))
    # print(get_light(lat=60.1699, lng=24.9384, date='2019-07-16', time='13:06:55'))

    print(main(lat=60.1674086, lng=24.9425683, date='2019-11-17', time='1:6:55'))
