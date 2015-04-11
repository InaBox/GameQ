// declare a module
var gameQApp = angular.module('gameQApp', ['ngRoute', 'ngSanitize']);

gameQApp.config(function ($routeProvider) {
	$routeProvider
		.when('/search', {templateUrl: '/frontend/js/partials/search.html', controller: 'SearchController'})
      	.when('/details/:gameId', { templateUrl: '/frontend/js/partials/details.html', controller: 'GameDetailsController'})
      	.otherwise({redirectTo: '/search'});
});

gameQApp.factory('singleGameFactory', function ($http) {
	return {
		getGameDetails: function(gameId, scope) {
			var x2js = new X2JS();
			$http.get('http://localhost:9292/www.boardgamegeek.com/xmlapi/boardgame/' + gameId).success(function(data) {
			  	var jsonGame =  x2js.xml_str2json( data );
			  	var gameObject = jsonGame.boardgames.boardgame;

			  	var game =  {};

			  	game.name = gameObject.name.__text;
			  	game.year = gameObject.yearpublished;
			  	game.version = gameObject.version;
			  	game.description = gameObject.description;
			  	game.minplayers = gameObject.minplayers;
			  	game.maxplayers = gameObject.maxplayers;
			  	game.mintime = gameObject.minplayerstime;
			  	game.maxtime = gameObject.maxplaytime;
			  	game.suggestedAge = gameObject.age;
			  	game.image = gameObject.image;

			  	game.designers = [];
				if (angular.isArray(gameObject.boardgamedesigner)) {
				  	angular.forEach(gameObject.boardgamedesigner, function(designer, key) {
				  		game.designers.push(designer.__text);
				  	});
				} else {
					game.designers.push(gameObject.boardgamedesigner.__text);
				};
			  	
			  	game.family = gameObject.boardgamefamily;

			  	game.publishers = [];
			  	if (angular.isArray(gameObject.boardgamepublisher)) {
				  	angular.forEach(gameObject.boardgamepublisher, function(publisher, key) {
				  		game.publishers.push(publisher.__text);
				  	});
				} else {
					game.publishers.push(gameObject.boardgamepublisher.__text);
				};

				game.categories = [];
			  	if (angular.isArray(gameObject.boardgamecategory)) {
				  	angular.forEach(gameObject.boardgamecategory, function(category, key) {
				  		game.categories.push(category.__text);
				  	});
				} else {
					game.categories.push(gameObject.boardgamecategory.__text);
				};

				game.artists = [];
			  	if (angular.isArray(gameObject.boardgameartist)) {
				  	angular.forEach(gameObject.boardgameartist, function(artist, key) {
				  		game.artists.push(artist.__text);
				  	});
				} else {
					game.artists.push(gameObject.boardgameartist.__text);
				};
				
				game.honors = [];
			  	if (angular.isArray(gameObject.boardgamehonor)) {
				  	angular.forEach(gameObject.boardgamehonor, function(honor, key) {
				  		game.honors.push(honor.__text);
				  	});
				} else {
					game.honors.push(gameObject.boardgamehonor.__text);
				};

				game.mechanics = [];
			  	if (angular.isArray(gameObject.boardgamemechanic)) {
				  	angular.forEach(gameObject.boardgamemechanic, function(mechanic, key) {
				  		game.mechanics.push(mechanic.__text);
				  	});
				} else {
					game.mechanics.push(gameObject.boardgamemechanic.__text);
				};

			  	scope.singleGame = game;
			  	console.log(scope.singleGame);
			  	console.log(gameObject);
			});
		}
	};
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
		  		$scope.search.message = "Your search gave " + $scope.games.length + " results";
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

gameQApp.controller('GameDetailsController', function ($scope, $routeParams, singleGameFactory) {
	singleGameFactory.getGameDetails($routeParams.gameId, $scope);
});

