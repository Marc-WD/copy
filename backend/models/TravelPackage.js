const mongoose = require('mongoose');

const PackageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  destination: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  durationDays: Number,
  startDate: Date,
  images: [String],
  tags: [String],
  likes: { type: Number, default: 0 },
  likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('TravelPackage', PackageSchema);
