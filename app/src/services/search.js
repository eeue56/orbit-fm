module.exports = function(socket) {
  
  var events = {};
  
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

  function search(string) {
    socket.emit('search ' + string);
  }

  function populate(tracks) {
    results.concat(tracks);
    trigger('result', tracks);
  }
 
  socket.on('search', populate);

  return {
    on: on,
    for: search
  }
}
