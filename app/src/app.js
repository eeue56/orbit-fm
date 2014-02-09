angular.module('app', ['ngRoute', 'btford.socket-io'])
//
.config(function($routeProvider) {
  $routeProvider

  // User joining to add music
  .when('/join/:id', {
    templateUrl: 'partials/session.html',
    controller: 'SessionController'
  })

  .when('/settings', {
    templateUrl: 'partials/settings.html',
    controller: 'SettingsController'
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
