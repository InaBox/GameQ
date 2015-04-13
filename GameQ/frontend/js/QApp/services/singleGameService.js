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
			  	game.family = gameObject.boardgamefamily;

			  	game.designers = [];
			  	if (gameObject.boardgamedesigner != null) {
					if (angular.isArray(gameObject.boardgamedesigner)) {
					  	angular.forEach(gameObject.boardgamedesigner, function(designer, key) {
					  		game.designers.push(designer.__text);
					  	});
					} else {
						game.designers.push(gameObject.boardgamedesigner.__text);
					}
			  	}
			  	

			  	game.publishers = [];
			  	if (gameObject.boardgamepublisher != null) {
				  	if (angular.isArray(gameObject.boardgamepublisher)) {
					  	angular.forEach(gameObject.boardgamepublisher, function(publisher, key) {
					  		game.publishers.push(publisher.__text);
					  	});
					} else {
						game.publishers.push(gameObject.boardgamepublisher.__text);
					}
			  	}

				game.categories = [];
				if (gameObject.boardgamecategory != null) {
				  	if (angular.isArray(gameObject.boardgamecategory)) {
					  	angular.forEach(gameObject.boardgamecategory, function(category, key) {
					  		game.categories.push(category.__text);
					  	});
					} else {
						game.categories.push(gameObject.boardgamecategory.__text);
					}
				}


				game.artists = [];
				if (gameObject.boardgameartist != null) {
				  	if (angular.isArray(gameObject.boardgameartist)) {
					  	angular.forEach(gameObject.boardgameartist, function(artist, key) {
					  		game.artists.push(artist.__text);
					  	});
					} else {
						game.artists.push(gameObject.boardgameartist.__text);
					}
				}
				
				game.honors = [];
				if (gameObject.boardgamehonor != null) {
				  	if (angular.isArray(gameObject.boardgamehonor)) {
					  	angular.forEach(gameObject.boardgamehonor, function(honor, key) {
					  		game.honors.push(honor.__text);
					  	});
					} else {
						game.honors.push(gameObject.boardgamehonor.__text);
					}
				}

				game.mechanics = [];
				if (gameObject.boardgamemechanic) {
				  	if (angular.isArray(gameObject.boardgamemechanic)) {
					  	angular.forEach(gameObject.boardgamemechanic, function(mechanic, key) {
					  		game.mechanics.push(mechanic.__text);
					  	});
					} else {
						game.mechanics.push(gameObject.boardgamemechanic.__text);
					}
				}

			  	scope.singleGame = game;
			  	console.log(scope.singleGame);
			  	console.log(gameObject);
			});
		}
	};
});