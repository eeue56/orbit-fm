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
