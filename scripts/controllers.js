'use strict';

var appControllers = angular.module('appControllers', []);

var actorName;

appControllers.controller('actorsController', ['$scope', '$http', function (scope, http) {
  http({
    method: 'GET',
    // url: 'https://holly-diary.herokuapp.com/actors'
    url: 'http://localhost:5000/actors'
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

  scope.addedMovies = [];
  scope.oldName;
  scope.oldRating;
  scope.toggleEditForm = false;
  scope.editActor = function (name, date, sex, rating, lightSkinned, about) {
    scope.toggleEditForm = !scope.toggleEditForm;
    scope.oldName = name;
    scope.name = name;
    scope.day = date[0].day;
    scope.month = date[0].month;
    scope.year = date[0].year;
    scope.sex = sex;
    scope.oldRating = rating;
    scope.rating = rating;
    scope.lightSkinned = lightSkinned;
    scope.about = about;
  };

  scope.addMovies = function () {
    scope.addedMovies.push(scope.movies);
    scope.movies = '';
    console.log(scope.addedMovies);
  };

  scope.average = function (a, b) {
    return (a + b)/2;
  };

  scope.submitChanges = function  () {
    console.log(scope.oldName);
    var actorObject = {
      name: scope.name,
      day: scope.day,
      month: scope.month,
      year: scope.year,
      movies: scope.addedMovies,
      sex: scope.sex,
      rating: scope.average(+scope.oldRating, +scope.rating),
      lightSkinned: scope.lightSkinned,
      about: scope.about
    };
    console.log(actorObject);

    // http({
    //   method: 'PUT',
    //   url: 'http://localhost:5000/actors/' + scope.oldName,
    //   headers : { 'Content-Type': 'application/x-www-form-urlencoded' },
    //   data: $.param(actorObject)
    // });

  };

  scope.close = function () {
    scope.toggleEditForm = !scope.toggleEditForm;
  };

}]);

appControllers.controller('actorDetailController', ['$scope', '$http', function (scope, http) {
  http({
    method: 'GET',
    // url: 'https://holly-diary.herokuapp.com/actors/' + actorName
    url: 'http://localhost:5000/actors/' + actorName
    })

    .success(function (data) {
      console.log(data);
    });
  
}]);

appControllers.controller('newActorController', ['$scope', '$http', function (scope, http) {
  scope.films = [];
  scope.addToMovies = function () {
    console.log(scope.movies);
    scope.films.push(scope.movies);
    scope.movies = '';
    console.log(scope.films);
    return scope.films;

  };
  scope.addActor = function () {
    // console.log(scope.films);
      var actorObject = {
        name: scope.name,
        day: scope.day,
        month: scope.month,
        year: scope.year,
        movies: scope.films,
        sex: scope.sex,
        rating: scope.rating,
        lightSkinned: scope.lightSkinned,
        about: scope.about
      };
      console.log(actorObject);

    http({
      method: 'POST',
      url: 'http://localhost:5000/actors',
      // url: 'https://holly-diary.herokuapp.com/actors',
      headers : { 'Content-Type': 'application/x-www-form-urlencoded' },
      data: $.param(actorObject)
    });
    // console.log(movies);

    // var deleteObject = {
    //   http({
    //     method: 'DELETE',
    //     url: 'https://holly-diary.herokuapp.com/actors'
    //   });
    // }
  };

}]);

