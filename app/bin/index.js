(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
angular.module('app', ['ngRoute', 'btford.socket-io'])

.config(function($routeProvider) {
  $routeProvider

  // User joining to add music
  .when('/play/:session_id', {
    templateUrl: 'partials/session.html',
    controller: 'SessionController'
  })

  .when('/settings', {
    templateUrl: 'partials/settings.html',
    controller: 'SettingsController'
  })

  // DJ joining to moderate
  .when('/dj/:session_id', {
    templateUrl: 'partials/play.html',
    controller: 'DjController'
  })
  
  .otherwise({
    redirectTo: '/about'
  });

})

.factory({
  'socket': require('./services/socket'),
  'playlist': require('./services/playlist'),
  'session': require('./services/session'),
  'search': require('./services/search'),
  'eventName': require('./services/eventName')
})

.filter({

})


.controller({
  'TestController': require('./controllers/TestController'),
  'SettingsController': require('./controllers/SettingsController'),
  'SessionController': require('./controllers/SessionController')
})

.directive({
  'progress': require('./directives/progress')
});

},{"./controllers/SessionController":2,"./controllers/SettingsController":3,"./controllers/TestController":4,"./directives/progress":5,"./services/eventName":6,"./services/playlist":7,"./services/search":8,"./services/session":9,"./services/socket":10}],2:[function(require,module,exports){
module.exports = function($scope) {

  $scope.current = {};
  $scope.time = '0:00';

  $scope.songs = [{
    title: 'AngularJS',
    artist: 'Brian Ford',
    duration: '4:05'
  },
  {
    title: 'Bonfire',
    artist: 'Knife Party',
    duration:'3:06'
  }];

  function next() {
    $scope.current = $scope.songs.shift();
  }

  next();

}

},{}],3:[function(require,module,exports){
module.exports = function($scope) {
  
}

},{}],4:[function(require,module,exports){
module.exports = function($scope, session) {
  console.log('loaded');  
  $scope.add = function(uri) {
    session.add(uri);
  }

}

},{}],5:[function(require,module,exports){
module.exports = function() {
  return {
    restrict: 'A',
    scope: {
      progress: '='
    },
    link: function($scope, element, attrs) {
      $scope.$watch('progress', function(val, old) {
        console.log(val, old);
      });
    },
    templateUrl: 'partials/progress.html'
  }
}

},{}],6:[function(require,module,exports){
module.exports = function() {
  return function(name, events) {
    var names, event, i;

    names = {};
    for(i = 0; i < events.length; i++) {
      event = events[i];
      names[event] = name + ' ' + event;
    }
  }
}

},{}],7:[function(require,module,exports){
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

},{}],8:[function(require,module,exports){
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

},{}],9:[function(require,module,exports){
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

},{}],10:[function(require,module,exports){
module.exports = function(socketFactory) {
  return socketFactory();
}

},{}]},{},[1])