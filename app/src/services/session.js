module.exports = function(socket, eventName) {
  
  var event = eventName('session', [
    'get', 'add', 'remove', 
    'progress', 'pause', 'play']);
  
  return function(id) {
    
    var songs = [];
   
    // get tracks for this queue
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
    
    // Get the song at the top of the list
    function current() {
      return songs[0];
    }

    // remove the current song 
    socket.on(event.next, function() {
      songs.shift();
    });
    
    // pause the current song
    socket.on(event.pause, function() {
      current().playing = false;
    });

    // 
    socket.on(event.play, function() {
      current().playing = true;
    });

    socket.on(event.progress, function(now, duration) {
      current().duration = duration;
      current().now = now;
    });

    socket.on(event.get, function(tracks) {
      songs.concat(tracks);
    });


    socket.on(event.add, function(track) {
      songs.push(track);
    });

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
      songs: songs,
      get: get,
      add: add,
      remove: remove,
      current: current
    }
  }
}