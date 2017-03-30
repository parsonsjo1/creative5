var mongoose = require('mongoose');

var SpiritualSchema = new mongoose.Schema({
  topic: 'spiritual',
  title: String,
  scripture: String,
  image: String,
  upvotes: { type: Number, default: 0 }
});

SpiritualSchema.methods.upvote = function(cb) {
  this.upvotes += 1;
  this.save(cb);
};


mongoose.model('Spiritual', SpiritualSchema);