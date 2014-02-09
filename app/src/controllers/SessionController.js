module.exports = function($scope, $routeParams, session) {
  
  var id = $routeParams.id;
  // decide whether this is a public/private id
  var session = session(id);

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

}
