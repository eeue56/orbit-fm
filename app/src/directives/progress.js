module.exports = function() {
  return {
    restrict: 'A',
    scope: {
      progress: '='
    },
    link: function($scope, element, attrs) {
      $scope.$watch('progress', function(val, old) {
        console.log(val, old);
      });
    },
    templateUrl: 'partials/progress.html'
  }
}
