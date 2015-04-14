gameQApp.controller('SaveGameController', function ($scope, $http, singleGameFactory) {


	$scope.saveGame = function(singleGame) {
		//todo: call to backend controller
		//that will save data as Umbraco node
	}

		$scope.getGame = function(id) {
		singleGameFactory.getGameDetails(id, $scope);
	}

});