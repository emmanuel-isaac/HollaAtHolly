'use strict';

var appControllers = angular.module('appControllers', []);

var actorName;

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

var dayValidator = function (day) {
  if (day == undefined) {
    alert('Please, fill the \'day\' field');
    return false;
  } else if (+day >= 1 && +day <= 31) {
    return true;
  } else {
    alert('Please, make a valid day entry');
    return false;
  }
};

var monthValidator = function (month) {
  if (month == undefined) {
    alert('Please, fill the \'month\' field');
    return false;
  }else if (+month >= 1 && +month <= 12) {
    return true;
  } else {
    alert('Please, make a valid month entry');
    return false;
  }
};

var yearValidator = function (year) {
  if (year == undefined) {
    alert('Please, fill the \'year\' field');
    return false;
  } else if (+year >= 1900 && +year <= 2015) {
    return true;
  } else {
    alert('Please, make a valid year entry (between 1900 and 2015');
    return false;
  }
};

var ratingValidator = function (rating) {
  if (rating == undefined) {
    alert('Please, fill the \'rating\' field');
    return false;
  } else if (+rating >= 1 && +rating <= 5) {
    return true;
  } else {
    alert('Please, make a valid rating entry');
    return false;
  }
};

var sexValidator = function (sex) {
  if (sex == undefined) {
    alert('Please, fill the \'sex\' field');
    return false;
  } else if (sex == 'male' || sex == 'female') {
    return true;
  } else {
    alert('Please enter \'male\' or \'female\'');
    return false;
  }
};


appControllers.controller('actorsController', ['$scope', '$http', '$location', '$window', function (scope, http, location, window) {
  scope.reload = function () {
    window.location.reload();
  };
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
    console.log(actorObject.id);

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

  scope.close = function () {
    scope.toggleEditForm = !scope.toggleEditForm;
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

appControllers.controller('newActorController', ['$scope', '$http','$location', function (scope, http, location) {
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

    if (nameValidator(actorObject.name) && dayValidator(actorObject.day) && monthValidator(actorObject.month) && yearValidator(actorObject.year) && ratingValidator(actorObject.rating) && sexValidator(actorObject.sex)) {
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

