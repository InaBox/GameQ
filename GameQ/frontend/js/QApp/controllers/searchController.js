//TODO:
// - persist data when coming back from details page

gameQApp.controller('SearchController', function ($scope, $http, singleGameFactory) {
	//xml to json converter
	var x2js = new X2JS();

	//search games on boardgamegeek on search-button click 
	$scope.searchGames = function(query) {
		//ask boardgamergeek for games
		$http.get('http://localhost:9292/www.boardgamegeek.com/xmlapi/search?search=' + query).success(function(data) {
			//on success, convert result to json
		  	var jsonGames =  x2js.xml_str2json( data );
		  	//expose result on scope
		  	$scope.games = jsonGames.boardgames.boardgame;
		  	
		  	if ($scope.games === undefined) {
		  		$scope.search.message = 'No results';
		  	} else {
		  		$scope.search.message = 'Your search gave ' + $scope.games.length + ' results';
		  	};
		});
	}

	$scope.getGame = function(id) {
		//use factory to get specific game 
		singleGameFactory.getGameDetails(id, $scope);
	}

	$scope.saveGame = function(singleGame) {
		//TODO: 
		// - call to backend controller that will save data as Umbraco node
	}

});