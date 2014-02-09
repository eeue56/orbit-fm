module.exports = function(socketFactory) {
  var connectUrl = "http://orbit.fm/ws/";
  return socketFactory({
    ioSocket: io.connect(connectUrl)
  });
}
