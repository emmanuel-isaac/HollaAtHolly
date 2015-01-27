'use strict';

// appControllers Module
var appControllers = angular.module('appControllers', []);

var actorName;

/*NAME ENTRY VALIDATOR FUNCTION*/
var nameValidator = function (name) {
  if (name == undefined) {
    alert('Please, enter a Name');
    return false;
  } else if (name.trim() == '') {
    alert('Please, don\'t enter blank spaces in name field');
    return false;
  } else {
    return true;
  }
};

/*DAY ENTRY VALIDATOR FUNCTION*/
var dayValidator = function (day) {
  if (day == undefined) {
    alert('Please, fill the \'day\' field');
    return false;
  } else {return true};
};

/*MONTH ENTRY VALIDATOR FUNCTION*/
var monthValidator = function (month) {
  if (month == undefined) {
    alert('Please, fill the \'month\' field');
    return false;
  } else return true;
};

/*YEAR ENTRY VALIDATOR FUNCTION*/
var yearValidator = function (year) {
  if (year == undefined) {
    alert('Please, fill the \'year\' field');
    return false;
  } else return true;
};

/*RATING ENTRY VALIDATOR FUNCTION*/
var ratingValidator = function (rating) {
  if (rating == undefined) {
    alert('Please, fill the \'rating\' field');
    return false;
  } else if (rating < 1 || rating > 5) {
    alert('Please, input a value between 1 and 5 in the \'rating\' field');
    return false;
  } else return true;
};

/*SEX ENTRY VALIDATOR FUNCTION*/
var sexValidator = function (sex) {
  if (sex == undefined) {
    alert('Please, fill the \'sex\' field');
    return false;
  } else {
    return true;
  }
};

/*CONTROLLERS SERVING THE ACTORS.HTML PAGE*/
appControllers.controller('actorsController', ['$scope', '$http', '$location', '$window', function (scope, http, location, window) {
  scope.reload = function () {
    window.location.reload();
  };

  scope.showLoading = true; // Showing the loading GIF image

  scope.months = []; // scoped variable to hold allowed months entry
  scope.years = []; // scoped variable to hold allowed years entry
  scope.days = []; // scoped variable to hold allowed days entry

  for (var i=1; i<=12; i++) {
    scope.months.push(i);
  } // for loop to loop through 12 months

  for (var i=1900; i<=2015; i++) {
    scope.years.push(i);
  } // for looop to loop through year 1900 to year 2015

  for (var i=1; i<=31; i++) {
    scope.days.push(i);
  } // for loop to loop through all days in a month

  // http method to get info from the API
  http({
    method: 'GET',
    url: 'https://holly-diary.herokuapp.com/actors'
  })

  .success(function (data) {
    console.log(data);
    scope.actors = data;
    scope.orderProp = 'name';
    scope.showLoading = !scope.showLoading;
  })

  .error(function (statusCode) {
    console.log(statusCode);
    scope.showLoading = !scope.showLoading;
  });

  scope.save = function (name) {
    console.log(name);
    actorName = name;
  };

  scope.addedMovies = []; // empty array for added movies to be pushed into
  scope.oldName; // old name of actor prior to editing
  scope.oldRating; // old rating of actor prior to editing for the calculation of average rating
  scope.toggleEditForm = false; // show or hide edit form

  // function to show the edit form and fill in the input boxes with the actor information
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

  // function to push added movies into the previously declared empty array
  scope.addMovies = function () {
    scope.addedMovies.push(scope.movies);
    scope.movies = '';
    console.log(scope.addedMovies);
  };

  // function to determine the average rating
  scope.average = function (a, b) {
    return (a + b)/2;
  };

  // function to submit changes to server
  scope.submitChanges = function  () {
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

    // validator of user input before submission
    if (nameValidator(actorObject.name) && dayValidator(actorObject.day) && monthValidator(actorObject.month) && yearValidator(actorObject.year) && ratingValidator(actorObject.rating) && sexValidator(actorObject.sex)) {
      http({
        method: 'PUT',
        url: 'http://holly-diary.herokuapp.com/actors/' + scope.oldName,
        headers : { 'Content-Type': 'application/x-www-form-urlencoded' },
        data: $.param(actorObject)
      })

      .success(function () {
        alert('Actor Has Been Updated Successfully');
        scope.toggleEditForm = !scope.toggleEditForm;
        scope.reload();
      })

      .error(function (err) {
        alert(err);
      });
    }
    
  };

  // function to hide the edit form
  scope.close = function () {
    scope.toggleEditForm = !scope.toggleEditForm;
  };

}]);


/*ACTOR DETAIL CONTROLLER SERVING THE actorDetail.html VIEW*/
appControllers.controller('actorDetailController', ['$scope', '$http', function (scope, http) {
  // http get method to pull actor information from the database
  http({
    method: 'GET',
    url: 'https://holly-diary.herokuapp.com/actors/' + actorName
    })

  .success(function (data) {
    console.log(data);
    scope.actorDetail = data[0];
  });
  
}]);

appControllers.controller('newActorController', ['$scope', '$http','$location', function (scope, http, location) {
  scope.months = [];
  scope.years = [];
  scope.days = [];

  for (var i=1; i<=12; i++) {
    scope.months.push(i);
  }

  for (var i=1900; i<=2015; i++) {
    scope.years.push(i);
  }

  for (var i=1; i<=31; i++) {
    scope.days.push(i);
  }

  scope.films = [];
  scope.addToMovies = function () {
    console.log(scope.movies);
    scope.films.push(scope.movies);
    scope.movies = '';
    console.log(scope.films);
    return scope.films;

  };
  scope.addActor = function () {
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

    console.log(scope.day);
    console.log(scope.month);

    // validation before submitting user
    if (nameValidator(actorObject.name) && dayValidator(actorObject.day) && monthValidator(scope.month) && yearValidator(actorObject.year) && ratingValidator(actorObject.rating) && sexValidator(actorObject.sex)) {
      console.log('sending');
      http({
      method: 'POST',
      url: 'https://holly-diary.herokuapp.com/actors',
      headers : { 'Content-Type': 'application/x-www-form-urlencoded' },
      data: $.param(actorObject)
      })

      .success(function () {
        location.path('/actors');
        alert('New Actor Created Successfully');
      })

      .error(function () {
        alert('Some fields were not filled');
      });
    }
  };
}]);

