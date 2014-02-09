import requests
from json import loads

SEARCHING_URLS = {
    'youtube' : 'https://gdata.youtube.com/feeds/api/videos?alt=json&q='
}

NO_ARGS = ''

def parse_message(message):
    message = message.strip()
    if ' ' not in message:
        return (message.strip(), NO_ARGS)

    function = message[:message.index(' ')]
    args = message[message.index(' '):].strip()

    return (function, args)
