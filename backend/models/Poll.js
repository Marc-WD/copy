const mongoose = require('mongoose');

const PollOption = new mongoose.Schema({
  text: String,
  votes: { type: Number, default: 0 }
});

const PollSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [PollOption],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Poll', PollSchema);
