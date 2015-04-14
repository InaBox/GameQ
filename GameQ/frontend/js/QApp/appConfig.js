//declare the module
var gameQApp = angular.module('gameQApp', ['ngRoute', 'ngSanitize']);

//configure routs
gameQApp.config(function ($routeProvider) {
	$routeProvider
		.when('/search', {templateUrl: '/frontend/js/QApp/partials/search.html', controller: 'SearchController'})
      	.when('/details/:gameId', { templateUrl: '/frontend/js/QApp/partials/details.html', controller: 'GameDetailsController'})
      	.otherwise({redirectTo: '/search'});
});
