'use strict';

/*APP MODULE*/

var hollaAtHollyApp = angular.module('hollaAtHollyApp', [
  'ngRoute',
  'appControllers'  
]);

hollaAtHollyApp.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.
    when('/', {
      templateUrl: 'views/layout.html'
    })

    .when('/actors', {
      templateUrl: 'views/actors.html',
      controller: 'actorsController'
    })

    .when('/actors/:name', {
      templateUrl: 'views/actorDetail.html',
      controller: 'actorDetailController'
    })

    .when('/new', {
      templateUrl: 'views/newActor.html',
      controller: 'newActorController'
    })

    .otherwise({
      redirectTo: '/actors'
    });
}]);