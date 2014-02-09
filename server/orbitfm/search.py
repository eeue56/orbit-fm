import pyen

en = pyen.Pyen("K6O0P8KO54K2GNOFE")

class MagicSong(object):
    def __init__(self, **kwargs):
        for k, v in kwargs.items():
            self.__dict__[k] = v 

    def get_first_track(self):
        return MagicSource(**self.tracks[0])

class MagicSource(object):
    def __init__(self, **kwargs):
        for k, v in kwargs.items():
            self.__dict__[k] = v 

def search(words='', results=None, artist=None, track=None):

    params = {
        "combined" : words,
        "results" : results,
        "bucket" : ["id:spotify-WW", "tracks", "audio_summary"],
        "limit" : True,
    }

    if artist is not None:
        params["artist"] = artist

    if track is not None:
        params["track"] = track

    response = en.get('song/search', **params)

    songs = response['songs']


    tracks = [ {'artist_name':track['artist_name'],
     'title' :track['title'],
    'duration' :track['audio_summary']['duration']*1000,
     'id':track['tracks'][0]['foreign_id'].replace('-WW', '')} for track in songs]


    return tracks
