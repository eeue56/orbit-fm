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

def search_youtube(topics, removing=None):

    if removing is not None:
        topics = ' '.join([topics, removing])

    url_extension = '+'.join(topics.split())

    url = '{url}{params}'.format(url=SEARCHING_URLS['youtube'],
        params=url_extension) 

    print(url)

    response = requests.get(url)
    content = response.text

    print(content)



    return loads(content)
