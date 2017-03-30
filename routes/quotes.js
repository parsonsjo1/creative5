var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Quote = mongoose.model('Quote');

router.get("/", function(req, res, next) {
  Quote.find(function(err, quotes) {
    if(err) {
      return next(err);
    }
    res.json(quotes);
  });
});

router.get("/:quote", function(req, res) {
  res.json(req.quote);
});

router.post("/", function(req,res,next) {
  var quote = new Quote(req.body);
  quote.save(function(err, quote) {
    if(err) {
      return next(err);
    }
    res.json(quote);
  });
});

router.put('/:quote/upvote', function(req, res, next) {
  req.quote.upvote(function(err, quote) {
    if(err) {
      return next(err);
    }
    res.json(quote);
  });
});

router.delete('/:quote', function(req,res) {
  req.quote.remove();
  res.json(req.quote);
});

router.param('quote', function(req,res,next,id) {
  var query = Quote.findById(id);
  query.exec(function(err,quote) {
    if(err){
      return next(err);
    }
    if(!quote) {
      return next(new Error("can't find quote"));
    }
    req.quote = quote;
    return next();
  });
});

module.exports = router;
