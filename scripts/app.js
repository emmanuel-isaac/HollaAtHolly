'use strict';

/*APP MODULE*/

var hollaAtHollyApp = angular.module('hollaAtHollyApp', [
  'ngRoute',
  'appControllers'
]);

hollaAtHollyApp.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

  $locationProvider.html5Mode(true);

  $routeProvider

    .when('/', {
      templateUrl: 'views/layout.html'
    })

    .when('HollaAtHolly/actors', {
      templateUrl: 'views/actors.html',
      controller: 'actorsController'
    })

    .when('HollaAtHolly/actors/:name', {
      templateUrl: 'views/actorDetail.html',
      controller: 'actorDetailController'
    })

    .when('HollaAtHolly/new', {
      templateUrl: 'views/newActor.html',
      controller: 'newActorController'
    })

    .otherwise({
      redirectTo: 'HollyAtHolly/actors'
    });
}]);

angular.module('myApp', []).
 config(function($locationProvider) {
   $locationProvider.html5Mode(true);
 });