module.exports = function($scope, session) {
  console.log('loaded');  
  $scope.add = function(uri) {
    session.add(uri);
  }

}
