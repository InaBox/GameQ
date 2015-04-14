//TODO: 
// - Move functionality to backend
// - controller to get data, populate a model and send JSON back

gameQApp.factory('singleGameFactory', function ($http) {
	return {
		//getting game data from boardgamergeek
		getGameDetails: function(gameId, scope) {
			var x2js = new X2JS();
			$http.get('http://localhost:9292/www.boardgamegeek.com/xmlapi/boardgame/' + gameId).success(function(data) {
				//on success, convert xml to json
			  	var jsonGame =  x2js.xml_str2json( data );
			  	var gameObject = jsonGame.boardgames.boardgame;

			  	//manualy build an object
			  	//to ensure uniformity of data to display 
			  	var game =  {};

			  	organiseData = function(outputArray, jsonProperty) {
					if (jsonProperty != null) {
						if (angular.isArray(jsonProperty)) {
						  	angular.forEach(jsonProperty, function(value, key) {
						  		outputArray.push(value.__text);
						  	});
						} else {
							outputArray.push(jsonProperty.__text);
						}
				  	}
			  	};

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
			  	
			  	game.family = [];
			  	organiseData(game.family, gameObject.boardgamefamily);

			  	game.designers = [];
			 	organiseData(game.designers, gameObject.boardgamedesigner); 

			 	game.publishers = [];
				organiseData(game.publishers, gameObject.boardgamepublisher); 

				game.categories = [];
				organiseData(game.categories, gameObject.boardgamecategory); 

				game.artists = [];
				organiseData(game.artists, gameObject.boardgameartist);
				
				game.honors = [];
				organiseData(game.honors, gameObject.boardgamehonor);

				game.mechanics = [];
				organiseData(game.mechanics, gameObject.boardgamemechanic);

			  	scope.singleGame = game;
			});
		}
	};
});