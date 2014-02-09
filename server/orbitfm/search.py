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
    def get_details(self):
            self.artist = track['artist_name']
	    self.title = track['title']
            self.duration = track['audio_summary']['duration']*1000
            self.id = track['tracks'][0]['foreign_id'].replace('-WW', '')

def search(words, results, artist=None, track=None):

    if all(x is None for x in (artist, track)):
        return []

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

    response = pyen.get('song/search', **params)

    songs = response['songs']

    tracks = [MagicSong(**song) for song in songs]

    return tracks
