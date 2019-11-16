
import json
import requests
import datetime
from dateutil.parser import parse
import pyowm

owm = pyowm.OWM('bec386aec488e5a0830c770fc1a1a03c')


def get_clouds(location='Helsinki'):
    """
        Returns weather description at the moment by location
        https://github.com/csparpa/pyowm/blob/16edd44c97e4e154e3b3b77170e98cd6e8faa9ef/pyowm/weatherapi25/weather.py#L200
    """

    observation = owm.weather_at_place(location)
    w = observation.get_weather()

    return json.loads(w.to_JSON())["clouds"]


def get_light(lat, lng, date=False, time=False):
    """
        For a given time and date, return False for night and True for day.
        https://sunrise-sunset.org/api
    """

    if not date:
        date='today'

    if not time:
        time_now = datetime.datetime.now().time()
    else:
        time_now = parse(time).time()

    # print(date, time_now)

    response = requests.get(f'https://api.sunrise-sunset.org/json?lat={lat}&lng={lng}&date={date}')
    results = response.json()["results"]

    sunrise, sunset = results["sunrise"], results["sunset"]
    sunrise_conv = parse(sunrise).time()
    sunset_conv = parse(sunset).time()

    if sunrise_conv < time_now < sunset_conv:
        return True
    else:
        return False

if __name__ == "__main__":

    # Weather
    print(get_clouds(location='Helsinki'))

    # Day or night?
    print(get_light(lat=60.1699, lng=24.9384))
    print(get_light(lat=60.1699, lng=24.9384, date='today', time='9:06:55 AM'))
    print(get_light(lat=60.1699, lng=24.9384, date='2019-07-16', time='1:06:55 PM'))
