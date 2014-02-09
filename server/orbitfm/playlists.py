class Playlist(object):

    def __init__(self, id):
        self.id = id
        self.songs = []
        self.listeners = []

    def join(self, listener, admin=False):
        self.listeners.append(listener)

    def add_song(self, song):
        self.songs.append(song)

    def get_next_song(self):
        return songs.pop(0)

    def quit(self, listener):
        self.listeners.remove(listener)

