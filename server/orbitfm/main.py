import tornado.httpserver
import tornado.websocket
import tornado.ioloop
import tornado.web

import tornadio2 as tornadio
import logging

from playlists import Playlist

PORT_NUMBER = 8031

playlists = {
    
}

def require_join(func, *args, **kwargs):

    def f(self, *args, **kwargs):
        if self.playlist is None:
            self.emit("err", {'error' : 'please join a room'})
        else:
            return func(self, *args, **kwargs)

    return f

class SocketIoHandler(tornadio.conn.SocketConnection):

    def on_open(self, *args, **kwargs):
        self.playlist = None
        #tornadio.SocketConnection.on_open(self, *args, **kwargs)

    def on_message(self, message):
        pass

    @tornadio.event('session.join')
    def join(self, uri):
        global playlists
        print('joining')
        if uri not in playlists:
            playlists[uri] = Playlist(uri)
        playlists[uri].join(self)
        self.playlist = playlists[uri]

    #@require_join
    @tornadio.event('session.add')
    def add(self, uri):
        print('adding')
        self.playlist.add_song(uri)

    #@require_join
    @tornadio.event('session.quit')
    def quit(self, message):
        self.playlist.quit(self)

    @tornadio.event('session.get')
    def get(self, id):
        print('getting')
        self.emit('session.get', [{'artist': 'Sidewalk Prophets', 'id': 'spotify:track:0zS1S8NG396qqdZSG4dU4w', 'title': 'Wrecking Ball', 'duration': 184612.87999999998}])

    #@require_join
    @tornadio.event('session.search')
    def search(self, words):
        print('searching')
        self.emit("session.search", {"test": "test"})

    @tornadio.event('session.remove')
    def remove(self, uri):
        print('removing from session')
        self.emit("session.remove", {"uri" : uri})

SocketIoRouter = tornadio.router.TornadioRouter(SocketIoHandler)
routes = SocketIoRouter.urls

application = tornado.web.Application(
    routes,
    socket_io_port=PORT_NUMBER
)


if __name__ == '__main__':
    logging.basicConfig(filename='server.log', 
        level=logging.DEBUG,  
        format="%(asctime)s; %(levelname)s; %(message)s")

    logging.info("================\nStarting program")
 

    logging.debug("Listening on port {number}".format(number=PORT_NUMBER))
    sockio = tornadio.SocketServer(application, auto_start=False)

    logging.debug('Starting main loop...')
    tornado.ioloop.IOLoop.instance().start()

