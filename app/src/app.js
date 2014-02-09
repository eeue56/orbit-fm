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
