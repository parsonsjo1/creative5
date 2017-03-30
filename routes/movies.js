var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Movie = mongoose.model('Movie');

router.get("/", function(req, res, next) {
  Movie.find(function(err, movies) {
    if(err) {
      return next(err);
    }
    res.json(movies);
  });
});

router.get("/:movie", function(req, res) {
  res.json(req.movie);
});

router.post("/", function(req,res,next) {
  var movie = new Movie(req.body);
  movie.save(function(err, movie) {
    if(err) {
      return next(err);
    }
    res.json(movie);
  });
});

router.put('/:movie/upvote', function(req, res, next) {
  req.movie.upvote(function(err, movie) {
    if(err) {
      return next(err);
    }
    res.json(movie);
  });
});

router.delete('/:movie', function(req,res) {
  req.movie.remove();
  res.json(req.movie);
});

router.param('movie', function(req,res,next,id) {
  var query = Movie.findById(id);
  query.exec(function(err,movie) {
    if(err){
      return next(err);
    }
    if(!movie) {
      return next(new Error("can't find movie"));
    }
    req.movie = movie;
    return next();
  });
});

module.exports = router;
