
gameQApp.controller('GameDetailsController', function ($scope, $routeParams, singleGameFactory) {
	singleGameFactory.getGameDetails($routeParams.gameId, $scope);
});

