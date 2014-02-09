module.exports = function(socket, eventName) {
  
  var event = eventName('playlist', ['get', 'add', 'remove']);
  
  return function(id) {
    
    var name, songs;

    name = '';
    songs = [];
    
    // get tracks from this playlist
    function get() {
      socket.emit(event.get);
    }

    // Called when a track is added
    function add(track) {
      socket.emit(event.add, track);
    }
    
    // Remove a track using its ID
    function remove(id) {
      socket.emit(event.remove, id); 
    }
   
    // When the server responds to the get
    socket.on(event.get, function(playlist) {
      // have to do this in order not to lose the reference
      name.length = 0;
      name += playlist.name;

      songs.concat(playlist.tracks);
    });

    // When the server sends an add
    socket.on(event.add, function(track) {
      songs.push(track);
    });

    // When the server sends a remove
    socket.on(event.remove, function(id) {
      var i;
      for(i = 0; i < songs.length; i++) {
        if(songs[i].id === id) {
          songs.splice(i, 1);
          break;
        }
      }
    });

    return {
      name: name,
      songs: songs,
      get: get,
      add: add,
      remove: remove
    }

  }
}
