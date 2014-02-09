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
