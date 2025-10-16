const mongoose = require('mongoose');

const OptionSchema = new mongoose.Schema({
  text: String,
  // other fields if needed
});

const QuizSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [OptionSchema],
  correctIndex: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Quiz', QuizSchema);
