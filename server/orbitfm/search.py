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


def search(words, artist=None, track=None, album=None):

    if all(x is None for x in (artist, track, album)):
        return []

    params = {
        "combined" : words,
        "results" : 10,
        "limit" : True,
    }

    if artist is not None:
        params["artist"] = artist

    if track is not None:
        params["track"] = track

    if album is not None:
        params["album"] = album


    #TODO: replace playlist static
    response = pyen.get('playlist/static', **params)

    songs = response['songs']

    tracks = [MagicSong(**song) for song in songs]

    return tracks