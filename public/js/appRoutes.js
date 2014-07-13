angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		.when('/', {
			templateUrl: 'views/logs.html',
			controller: 'LogController'
		})
		.when('/logs', {
			templateUrl: 'views/logs.html',
			controller: 'LogController'
		})

	$locationProvider.html5Mode(true);

}]);