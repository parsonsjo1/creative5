var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Scripture = mongoose.model('Scripture');

router.get("/", function(req, res, next) {
  Scripture.find(function(err, scriptures) {
    if(err) {
      return next(err);
    }
    res.json(scriptures);
  });
});

router.get("/:scripture", function(req, res) {
  res.json(req.scripture);
});

router.post("/", function(req,res,next) {
  var scripture = new Scripture(req.body);
  scripture.save(function(err, scripture) {
    if(err) {
      return next(err);
    }
    res.json(scripture);
  });
});

router.put('/:scripture/upvote', function(req, res, next) {
  req.scripture.upvote(function(err, scripture) {
    if(err) {
      return next(err);
    }
    res.json(scripture);
  });
});

router.delete('/:scripture', function(req,res) {
  req.scripture.remove();
  res.json(req.scripture);
});

router.param('scripture', function(req,res,next,id) {
  var query = Scripture.findById(id);
  query.exec(function(err,scripture) {
    if(err){
      return next(err);
    }
    if(!scripture) {
      return next(new Error("can't find scripture"));
    }
    req.scripture = scripture;
    return next();
  });
});

module.exports = router;
