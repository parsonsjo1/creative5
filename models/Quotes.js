var mongoose = require('mongoose');

var QuoteSchema = new mongoose.Schema({
  topic: 'quote',
  title: String,
  quote: String,
  image: String,
  upvotes: { type: Number, default: 0 }
});

QuoteSchema.methods.upvote = function(cb) {
  this.upvotes += 1;
  this.save(cb);
};


mongoose.model('Quote', QuoteSchema);