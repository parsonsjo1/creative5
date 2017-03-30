var mongoose = require('mongoose');

var MovieSchema = new mongoose.Schema({
  topic: String,
  title: String,
  body: String,
  image: String,
  upvotes: { type: Number, default: 0 }
});

MovieSchema.methods.upvote = function(cb) {
  this.upvotes += 1;
  this.save(cb);
};


mongoose.model('Movie', MovieSchema);