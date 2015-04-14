//TODO: 
// - "Add game" button
// - rendering of game in a form
// - the same functionality as in searchController
// - isolate functionality? Form as directive ?

gameQApp.controller('GameDetailsController', function ($scope, $routeParams, singleGameFactory) {
	//use factory to get a particular game from boardgamergeek
	singleGameFactory.getGameDetails($routeParams.gameId, $scope);
});



