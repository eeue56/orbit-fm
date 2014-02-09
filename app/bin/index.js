(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
angular.module('app', ['ngRoute', 'btford.socket-io'])
//
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
  'settings': require('./services/settings'),
  'eventName': require('./services/eventName'),
  'storage': require('./services/storage')
})

.filter({
  'minutes': require('./filters/minutes'),
})

.controller({
  'SettingsController': require('./controllers/SettingsController'),
  'SearchController': require('./controllers/SearchController'),
  'SessionController': require('./controllers/SessionController')
})

.directive({
  'progress': require('./directives/progress'),
  'afterTyping': require('./directives/afterTyping')
});

},{"./controllers/SearchController":2,"./controllers/SessionController":3,"./controllers/SettingsController":4,"./directives/afterTyping":5,"./directives/progress":6,"./filters/minutes":7,"./services/eventName":8,"./services/playlist":9,"./services/search":10,"./services/session":11,"./services/settings":12,"./services/socket":13,"./services/storage":14}],2:[function(require,module,exports){
module.exports = function($scope, search) {
 
  $scope.critera = '';
  $scope.searching = false;
 
  $scope.results = null;
  
  $scope.blur = function() {
    $scope.results = null;
  };

  $scope.search = function() {
    $scope.searching = true;
    search.for($scope.criteria);

    $scope.results = [
      {title:'Testing cars', artist: 'No Patrol', length:'49:32'},
      {title:'Testing cars', artist: 'No Patrol', length:'49:32'},
      {title:'Testing cars', artist: 'No Patrol', length:'49:32'}
    ];
  };

  search.on('results', function(results) {
    $scope.results = results;
    $scope.searching = false;
  });

  
}

},{}],3:[function(require,module,exports){
module.exports = function($scope) {

  $scope.current = {};
  $scope.time = '0:00';
  $scope.progress = 0;

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

},{}],4:[function(require,module,exports){
module.exports = function($scope, $timeout, settings) {
  
  $scope.saving = false;
  $scope.name = settings.get('name');
  
  $scope.save = function() {
    $scope.saving = true;
    settings.set('name', $scope.name);
    $timeout(function() {
      $scope.saving = false;
    }, 1000)
  };

}

},{}],5:[function(require,module,exports){

// after-typing
// ------------

// Provides two attributes that can be used 
// to fire events after a given duration of
// time after a user has stopped typing.
//
// @after-typing    
// The code to be evaluated when the event is fired.
//
// @typing-duration 
// The duration after which to fire the event.
// Defaults to 1000ms.

module.exports = function($parse, $timeout) {
  return {
    restrict: 'A',
    link: function  (scope, element, attrs) {
      var timeout;
      
      element.bind('keyup', function() {
        var delay;
       
        $timeout.cancel(timeout);
        delay = attrs.typingDuration || 1000;
        timeout = $timeout(function() {  
          scope.$eval(attrs.afterTyping);
        }, delay);
      });
      
    }
  };
};

  

},{}],6:[function(require,module,exports){
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
    controller: function($scope) {
      $scope.progress = 0;
    },
    templateUrl: 'partials/progress.html'
  }
}

},{}],7:[function(require,module,exports){
// Turns milliseconds into minute measurements

module.exports = function() {
  return function(_seconds) {    
    var minutes, seconds;
    
    if(typeof _seconds !== 'undefined' || isNaN(_seconds)) {
      return '00:00';
    }

    minutes = Math.floor(_seconds / 60);
    seconds = Math.floor(((_seconds / 60) - minutes) * 60);

    seconds = seconds > 9 ? seconds : '0' + seconds;

    return minutes + ':' + seconds;
  }
}

},{}],8:[function(require,module,exports){
module.exports = function() {
  return function(name, events) {
    var names, event, i;

    names = {};
    for(i = 0; i < events.length; i++) {
      event = events[i];
      names[event] = name + ' ' + event;
    }

    return names;
  }
}

},{}],9:[function(require,module,exports){
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

},{}],10:[function(require,module,exports){
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

},{}],11:[function(require,module,exports){
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

},{}],12:[function(require,module,exports){
module.exports = function(storage) {
  var settings = storage('orbit-settings');
  
  return {
    get: settings.get,
    set: settings.set,
  };
}

},{}],13:[function(require,module,exports){
module.exports = function(socketFactory) {
  return socketFactory();
}

},{}],14:[function(require,module,exports){

// Storage Factory
// ---------------

// Provides localStorage support with a cookie
// based fallback. 

module.exports = function() {
  return function(id) {
    var cache, storage;
    
    storage = which();

    // Determines which type of storage
    // is available and returns a jQuery
    // style getter/setter for it's value.
    function which() {
      if(window.localStorage) {
        return function(data) {
          if(typeof data === 'undefined') {
            return localStorage[id];
          } else {
            localStorage[id] = data;
          }
        }
      } else {
        return function(data) {
          if(typeof data === 'undefined') {
            return document.cookie;
          } else {
            document.cookie = data;
          }
        }
      }
    }

    // Load the contents from whichever
    // storage is avaiable. If JSON parse
    // throws an exception, then the value
    // was undefined, so instead cache an
    // empty object.
    function load() {
      try {
        cache = JSON.parse(storage());
      } catch(e) {
        cache = {};
      }
      return cache;
    }

    // Save the contents of the cache
    // into storage
    function save() {
      storage(JSON.stringify(cache));
    }

    // Set a value within the cache
    // based on a key and then save it.
    function set(key, value) {
      if(!cache) load();
      cache[key] = value;
      save();
    }

    // Get a value from the cache
    function get(key) {
      if(!cache) load();
      return cache[key];
    } 

    // Expose get and set methods
    return {
      get: get,
      set: set
    }
  }
};

},{}]},{},[1])