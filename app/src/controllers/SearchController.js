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
      {title:'Mr Blue Sky', artist: 'E.L.o', length:'3:32'},
      {title:'Blue', artist: 'BigBang', length:'2:32'},
      {title:'Blue', artist: 'R.E.M', length:'4:32'}
    ];
  };

  search.on('results', function(results) {
    $scope.results = results;
    $scope.searching = false;
  });

  
}
