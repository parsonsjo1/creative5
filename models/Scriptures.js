var mongoose = require('mongoose');

var ScriptureSchema = new mongoose.Schema({
  title: String,
  scripture: String,
  url: String,
  upvotes: { type: Number, default: 0 }
});

ScriptureSchema.methods.upvote = function(cb) {
  this.upvotes += 1;
  this.save(cb);
};


mongoose.model('Scripture', ScriptureSchema);