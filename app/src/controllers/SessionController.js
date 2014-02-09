module.exports = function($scope, $routeParams, session) {
  
  var id = $routeParams.id;
  // decide whether this is a public/private id
  var session = session(id);

  session.on('get', function(songs) {
    console.log('HERE"S A GET REQUEST');
    $scope.songs = songs;
  });

  $scope.current = {};
  $scope.time = '0:00';
  $scope.progress = 0;
  $scope.songs = [];

  function next() {
    $scope.current = $scope.songs.shift();
  }

}
