angular.module('app', ['ngRoute', 'btford.socket-io'])

.config(function($routeProvider) {
  $routeProvider

  // User joining to add music
  .when('/:session_id', {
    templateUrl: 'partials/play.html',
    controller: 'SessionController'
  })

  // DJ joining to moderate
  .when('/dj/:session_id', {
    templateUrl: 'partials/play.html',
    controller: 'DjController'
  })

  // Publically available playlist URL
  .when('/playlist/share/:public_url', {
    templateUrl: 'partials/playlist.html',
    controller: 'PlaylistController'
  })

  // Privately available playlist URL
  .when('/playlist/edit/:private_url', {
    templateUrl: 'partials/playlist.html',
    controller: 'PlaylistEditController'
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
  'TestController': require('./controllers/TestController')
})

.directive({

});

