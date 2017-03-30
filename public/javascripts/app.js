var app = angular.module('flashcardsApp',['ngRoute']);

app.config(function($routeProvider, $locationProvider) {
  $routeProvider

  // Route for the home page
  .when('/', {
    templateUrl: 'pages/home.html',
    controller: 'mainController' 
  })

  // Route for the movies page
  .when('/movies', {
    templateUrl: 'pages/movies.html',
    controller: 'moviesController' 
  })

  // Route for the quotes page
  .when('/quotes', {
    templateUrl: 'pages/quotes.html',
    controller: 'quotesController' 
  })

  // Route for the spirituals page
  .when('/spirituals', {
    templateUrl: 'pages/spirituals.html',
    controller: 'spiritualsController' 
  })  

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

    $scope.addMovies = function() {
      console.log($scope.formContent);
      if($scope.formContent == undefined) {
        return;
      }

      $scope.create({
        title: $scope.formContent,
        body: $scope.formContent,
        upvotes: 0
      });

      $scope.formContent = '';

    };

    $scope.incrementUpvotes = function(movie) {
      $scope.upvote(movie);
    };

    $scope.getAll = function(movie) {
      return $http.get('/movies/').success(function(data) {
        angular.copy(data, $scope.movies);
      });
    };

    $scope.create = function(movie) {
      return $http.post('/movies', movie).success(function(data) {
        $scope.movies.push(data);
      });
    };

    $scope.upvote = function(comment) {
      return $http.put('/movies/' + movie._id + '/upvote')
      .success(function(data){
        movie.upvotes += 1;
      })
    };

    $scope.delete = function(movie) {
      $http.delete('/movies/' + comment._id)
      .success(function(data) {

      });
      $scope.getAll();
    }
    
    $scope.getAll();

  }
]);

app.controller('flashcardsController', [
  '$scope', '$http',
  function($scope, $http) {

    $scope.flashcards = [];

  }
]);





// app.controller('MainController', [
//   '$scope', '$http',
//   function($scope, $http) {

//     $scope.flashcards = [];

//     $scope.addFlashcard = function() {
//       console.log($scope.formContent);
//       if($scope.formContent == undefined) {
//         return;
//       }

//       $scope.create({
//         title: $scope.formContent,
//         upvotes: 0
//       });

//       $scope.formContent = '';

//     };

//     $scope.incrementUpvotes = function(comment) {
//       $scope.upvote(comment);
//     };

//     $scope.getAll = function(topic) {
//       return $http.get('/flashcards/' + topic).success(function(data) {
//         angular.copy(data, $scope.flashcards);
//       });
//     };

//     $scope.create = function(flashcard) {
//       return $http.post('/comments', comment).success(function(data) {
//         $scope.flashcards.push(data);
//       });
//     };

//     $scope.upvote = function(comment) {
//       return $http.put('/comments/' + comment._id + '/upvote')
//       .success(function(data){
//         comment.upvotes += 1;
//       })
//     };

//     $scope.delete = function(comment) {
//       $http.delete('/comments/' + comment._id)
//       .success(function(data) {

//       });
//       $scope.getAll();
//     }
    
//     $scope.getAll();

//   }
// ]);

