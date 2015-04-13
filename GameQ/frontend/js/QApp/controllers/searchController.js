
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