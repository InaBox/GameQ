// declare a module
var gameQApp = angular.module('gameQApp', ['ngRoute']);

gameQApp.config(function ($routeProvider) {
	$routeProvider
		.when('/search', {templateUrl: '/frontend/js/partials/search.html', controller: 'SearchController'})
      	.when('/details/:gameId', { templateUrl: '/frontend/js/partials/details.html', controller: 'GameDetailsController'})
      	.otherwise({redirectTo: '/search'});
});

gameQApp.controller('SearchController', function ($scope, $http) {
	var x2js = new X2JS();

	$scope.searchGames = function(query) {
		$http.get('http://localhost:9292/www.boardgamegeek.com/xmlapi/search?search=' + query).success(function(data) {
		  	var jsonGames =  x2js.xml_str2json( data );
		  	$scope.games = jsonGames.boardgames.boardgame;
		  	if ($scope.games == undefined) {
		  		$scope.search.message = "No results";
		  	} else {
		  		$scope.search.message = "";
		  	};
		});
	}

	$scope.getGame = function(id) {
		$http.get('http://localhost:9292/www.boardgamegeek.com/xmlapi/boardgame/' + id).success(function(data) {
		  	var jsonGame =  x2js.xml_str2json( data );
		  	$scope.singleGame = jsonGame.boardgames.boardgame;
		});
	}

});

gameQApp.controller('GameDetailsController', function ($scope, $http, $routeParams) {
	var x2js = new X2JS();
	$http.get('http://localhost:9292/www.boardgamegeek.com/xmlapi/boardgame/' + $routeParams.gameId).success(function(data) {
	  	var jsonGame =  x2js.xml_str2json( data );
	  	$scope.singleGame = jsonGame.boardgames.boardgame;
	});

});

