'use strict';

var appControllers = angular.module('appControllers', []);

var actorName;

appControllers.controller('actorsController', ['$scope', '$http', function (scope, http) {
  http({
    method: 'GET',
    url: 'https://holly-diary.herokuapp.com/actors'
  })

  .success(function (data) {
    console.log(data);
    scope.actors = data;
    scope.orderProp = 'name';
  });

  scope.save = function save (name) {
    console.log(name);
    actorName = name;
  };
}]);

appControllers.controller('actorDetailController', ['$scope', '$http', function (scope, http) {
  http({
    method: 'GET',
    url: 'https://holly-diary.herokuapp.com/actors/' + actorName
    })

    .success(function (data) {
      console.log(data);
    });
  
}]);

appControllers.controller('newActorController', ['$scope', '$http', function (scope, http) {
  scope.addActor = function () {
    http({
      method: 'POST',
      url: 'https://holly-diary.herokuapp.com/actors',
      headers : { 'Content-Type': 'application/x-www-form-urlencoded' },
      data: $.param({
        name: scope.name,
        day: scope.day,
        month: scope.month,
        year: scope.year,
        movies: scope.movies,
        // movies: scope.movies2,
        rating: scope.rating,
        lightSkinned: scope.lightSkinned,
        about: scope.about
      })
    });
  };
}]);

