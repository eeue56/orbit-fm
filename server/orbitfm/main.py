import tornado.httpserver
import tornado.websocket
import tornado.ioloop
import tornado.web

import tornadio2 as tornadio
import logging

PORT_NUMBER = 8031

class SocketIoHandler(tornadio.conn.SocketConnection):

    def on_open(self, *args, **kwargs):
        print('here')
        #tornadio.SocketConnection.on_open(self, *args, **kwargs)

    def on_message(self, message):
        print('MEssage ', message)
        self.send('hey 2')
        #tornadio.SocketConnection.on_message(self, message)

    @tornadio.event('session.add')
    def add(self, message):
        print(message)
        self.emit("add", {"hello" : "hello"})



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

