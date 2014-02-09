module.exports = function($scope, search) {
 
  $scope.critera = '';
  $scope.searching = false;
 
  $scope.results = null;
  
  $scope.blur = function() {
    $scope.results = null;
  };

  $scope.search = function() {
    if($scope.criteria.length === 0) {
      $scope.results = null;
      return;
    }

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
