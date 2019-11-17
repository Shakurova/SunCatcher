import requests

from datetime import datetime


def round_timebucket(tstmp):
    minute_rounded = tstmp.minute - (tstmp.minute % 10)
    tb = tstmp.strftime("%Y-%m-%d %H:{}:00").format(minute_rounded)
    return datetime.strptime(tb, "%Y-%m-%d %H:%M:%S")


def is_outdoors(lat, lon):
    """Decide if the person is inside or outside"""
    response = requests.get("https://nominatim.openstreetmap.org/reverse?format=json&lat="
                            + lat + "&lon=" + lon + "&zoom=18&addressdetails=1")
    bbox = response.json()["boundingbox"]
    return bbox[0] <= lat <= bbox[1] and bbox[2] <= lon <= bbox[3]


def create_new_walk(time_bucket, user_id, lat, lon):
    
    walk = {
            'time_bucket': time_bucket,
            'duration': 0,
            'user_id': user_id,
            'ltd': lat,
            'lng': lon, 

        }

    #ToDo: Call api to get weather, weather_description, daylight
    weather_details = {
        "weather": 1,
        "weather_description": "clear",
        "daylight": 0
    }

    walk.update(weather_details)

    return walk
