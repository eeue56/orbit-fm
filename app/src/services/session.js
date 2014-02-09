module.exports = function(socket, eventName) {
  
  var event = eventName('session', [
    'get', 'add', 'remove', 'next', 
    'progress', 'pause', 'play']);
  
  return function(id) {
    
    var songs = [];
    var events = {};
       
    // get tracks for this queue
    function get() {
      console.log('Request response');
      socket.emit(event.get, id);
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

    function on(event, fn) {
      if(!(events[event] instanceof Array)) {
        events[event] = [];
      }
      events[event].push(fn);
    }

    function trigger(event, data) {
      if(events[event] instanceof Array) {
        for(var i = 0; i < events[event].length; i++) {
          events[event][i](data);
        }
      }
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
      trigger('get', tracks);
      console.log('Here is response');
      songs.concat(tracks);
    });


    socket.on(event.add, function(track) {
      trigger('add', track);
      songs.push(track);
    });

    socket.on(event.remove, function(id) {
      trigger('remove', id); 
    });

    get();

    return {
      songs: songs,
      get: get,
      add: add,
      remove: remove,
      on: on,
      current: current
    }
  }
}
