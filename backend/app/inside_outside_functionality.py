

def in_out_decider(lat, lon):
    """Decide if the person is inside or outside"""
    import requests

    response = requests.get("https://nominatim.openstreetmap.org/reverse?format=json&lat="
                            + lat + "&lon=" + lon + "&zoom=18&addressdetails=1")
    bbox = response.json()["boundingbox"]
    return bbox[0] <= lat <= bbox[1] and bbox[2] <= lon <= bbox[3]


def get_inout_periods(cache):
    """Find periods of outdoor time (> 1min)"""
    all = [in_out_decider(str(cache_entry[2]), str(cache_entry[3])) for cache_entry in cache]
    serie = []
    for i in range(0, len(all) - 1):
        if not all[i]:
            if all[i] == all[i + 1]:
                serie.append(cache[i])
            else:
                serie.append(cache[i])
                yield serie[0], serie[-1], len(serie)
                serie = []


def input_db(cache):
    """Generate entries for user outdoor time based on user cache"""
    import math

    user_entry = {}
    for begin, end, dur in get_inout_periods(cache):
        user_entry["user_id"] = begin[0]
        user_entry["time_from"] = begin[1]
        user_entry["time_end"] = end[1]
        user_entry["duration"] = dur
        user_entry["distance"] = math.sqrt((end[2] - begin[2])**2 + (end[3] - begin[3])**2)
        user_entry["start"] = (begin[2], begin[3])
        user_entry["end"] = (end[2], end[3])
        print(user_entry)
        # yield(user_entry)


# time sorted user data
cache = []


def accumulate_pushes(push):
    import copy
    global cache
    cache.append(copy.deepcopy(push))


lat = 60.1857710
lon = 24.8237032
user_id = 'misha'
time = '13:10:20'
push = [user_id, time, lat, lon]

for i in range(1, 11):
    accumulate_pushes(push)
    push[1] = push[1][:4] + str(i) + push[1][5:]
    push[2] += 0.01 * i
    push[3] += 0.01 * i

input_db(cache)