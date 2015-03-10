// declare a module
var gameQApp = angular.module('gameQApp', []);



// configure the module.
// in this example we will create a greeting filter
gameQApp.controller('HomeController', function($scope) {
	$scope.greeting = {text: 'hey'};
});

gameQApp.controller('SearchController', function ($scope, $http) {
  $http.get('http://www.boardgamegeek.com/xmlapi/search?search=Crossbows%20and%20Catapults').success(function(data) {
    $scope.games = data;
  });
});

