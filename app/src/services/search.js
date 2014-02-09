module.exports = function(socket) {
  
  var results = [];

  function search(string) {
    socket.emit('search ' + string);
  }

  function populate(tracks) {
    results.concat(tracks);
  }
 
  socket.on('search', populate);

  return {
    results: results,
    for: search
  }
}
