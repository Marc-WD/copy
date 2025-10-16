const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
  title: String,
  description: String,
  images: [String],
  price: Number,
  likes: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Package', packageSchema);

