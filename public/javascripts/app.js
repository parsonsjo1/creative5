var app = angular.module('favoritesApp',['ngRoute']);

app.config(function($routeProvider, $locationProvider) {
  $routeProvider

  // Route for the home page
  .when('/favorites/home', {
    templateUrl: 'pages/home.html',
    controller: 'mainController' 
  })

  // Route for the movies page
  .when('/favorites/movies', {
    templateUrl: 'pages/movies.html',
    controller: 'moviesController' 
  })

  // Route for the quotes page
  .when('/favorites/quotes', {
    templateUrl: 'pages/quotes.html',
    controller: 'quotesController' 
  })

  // Route for the scriptures page
  .when('/favorites/scriptures', {
    templateUrl: 'pages/scriptures.html',
    controller: 'scripturesController' 
  })  

  .otherwise({ redirectTo: '/favorites/home' });

  // Using for history and pretty urls
  $locationProvider.html5Mode(true);

});

app.controller('mainController', [
  '$scope', '$http',
  function($scope, $http) {

    $scope.topics = ["History", "Math"];

  }
]);

app.controller('moviesController', [
  '$scope', '$http',
  function($scope, $http) {

    $scope.movies = [];

    $scope.addMovie = function() {
      // console.log($scope.movieTitle);
      // console.log($scope.movieFavoriteLine);
      // console.log($scope.movieUrl);
      if($scope.movieTitle == undefined || $scope.movieFavoriteLine == undefined ) {
        return;
      }

      $scope.create({
        title: $scope.movieTitle,
        favoriteLine: $scope.movieFavoriteLine,
        url: $scope.movieUrl,
        upvotes: 0
      });

      $scope.movieTitle = '';
      $scope.movieFavoriteLine = '';
      $scope.movieUrl = '';

    };

    $scope.incrementUpvotes = function(movie) {
      $scope.upvote(movie);
    };

    $scope.getAll = function() {
      return $http.get('/movies').success(function(data) {
        angular.copy(data, $scope.movies);
      });
    };

    $scope.create = function(movie) {
      return $http.post('/movies', movie).success(function(data) {
        $scope.movies.push(data);
      });
    };

    $scope.upvote = function(movie) {
      return $http.put('/movies/' + movie._id + '/upvote')
      .success(function(data){
        movie.upvotes += 1;
      })
    };

    $scope.delete = function(movie) {
      $http.delete('/movies/' + movie._id)
      .success(function(data) {
        console.log("successful delete");
      });
      $scope.getAll();
    }
    
    $scope.getAll();

  }
]);

app.controller('quotesController', [
  '$scope', '$http',
  function($scope, $http) {

    $scope.quotes = [];

    $scope.addQuote = function() {
      // console.log($scope.quoteTitle);
      // console.log($scope.quoteFavoriteLine);
      // console.log($scope.quoteUrl);
      if($scope.quoteFavoriteLine == undefined || $scope.quoteAuthor == undefined) {
        return;
      }

      $scope.create({
        title: $scope.quoteTitle,
        favoriteLine: $scope.quoteFavoriteLine,
        author: $scope.quoteAuthor,
        url: $scope.quoteUrl,
        upvotes: 0
      });

      $scope.quoteTitle = '';
      $scope.quoteFavoriteLine = '';
      $scope.quoteAutor = '';
      $scope.quoteUrl = '';

    };

    $scope.incrementUpvotes = function(quote) {
      $scope.upvote(quote);
    };

    $scope.getAll = function() {
      return $http.get('/quotes').success(function(data) {
        angular.copy(data, $scope.quotes);
      });
    };

    $scope.create = function(quote) {
      return $http.post('/quotes', quote).success(function(data) {
        $scope.quotes.push(data);
      });
    };

    $scope.upvote = function(quote) {
      return $http.put('/quotes/' + quote._id + '/upvote')
      .success(function(data){
        quote.upvotes += 1;
      })
    };

    $scope.delete = function(quote) {
      $http.delete('/quotes/' + quote._id)
      .success(function(data) {
        console.log("successful delete");
      });
      $scope.getAll();
    }
    
    $scope.getAll();

  }
]);





app.controller('scripturesController', [
  '$scope', '$http',
  function($scope, $http) {

    $scope.scriptures = [];

    $scope.addScripture = function() {
      // console.log($scope.scriptureTitle);
      // console.log($scope.scriptureFavoriteLine);
      // console.log($scope.scriptureUrl);
      if($scope.scriptureFavoriteLine == undefined) {
        return;
      }

      $scope.create({
        title: $scope.scriptureTitle,
        scripture: $scope.scriptureFavoriteLine,
        url: $scope.scriptureUrl,
        upvotes: 0
      });

      $scope.scriptureTitle = '';
      $scope.scriptureFavoriteLine = '';
      $scope.scriptureUrl = '';

    };

    $scope.incrementUpvotes = function(scripture) {
      $scope.upvote(scripture);
    };

    $scope.getAll = function() {
      return $http.get('/scriptures').success(function(data) {
        angular.copy(data, $scope.scriptures);
      });
    };

    $scope.create = function(scripture) {
      return $http.post('/scriptures', scripture).success(function(data) {
        $scope.scriptures.push(data);
      });
    };

    $scope.upvote = function(scripture) {
      return $http.put('/scriptures/' + scripture._id + '/upvote')
      .success(function(data){
        scripture.upvotes += 1;
      })
    };

    $scope.delete = function(scripture) {
      $http.delete('/scriptures/' + scripture._id)
      .success(function(data) {
        console.log("successful delete");
      });
      $scope.getAll();
    }
    
    $scope.getAll();

  }
]);


