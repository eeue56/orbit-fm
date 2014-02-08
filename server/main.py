import tornado.httpserver
import tornado.websocket
import tornado.ioloop
import tornado.web

import logging



class WSHandler(tornado.websocket.WebSocketHandler):
    def open(self):
        logging.info('User joined!')

    def on_message(self, message):
        logging.info('Message {mes} recieved'.format(mes=message))
    
    def on_close(self):
        logging.info('User disconnected!')

application = tornado.web.Application([
    (r"/ws", WSHandler),  
])

if __name__ == '__main__':
    logging.basicConfig(filename='server.log', 
        level=logging.DEBUG,  
        format="%(asctime)s; %(levelname)s; %(message)")

    logging.info("================\nStarting program")

    PORT_NUMBER = 8031

    logging.debug("Listening on port {number}".format(number=PORT_NUMBER))

    application.listen(PORT_NUMBER)

    logging.debug('Starting main loop...')
    tornado.ioloop.IOLoop.instance().start()
