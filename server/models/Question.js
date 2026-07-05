const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  skill: { type: String, required: true, index: true },
  question: { type: String, required: true },
  idealAnswer: { type: String, required: true },
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'medium' },
  company: [{ type: String }],
  tags: [{ type: String }],
  options: [{ type: String }],         // 4 MCQ options (one correct, three confusing)
  correctOption: { type: Number },     // index 0-3 of the correct option
  source: { type: String, default: 'curated' }
}, { timestamps: true });

module.exports = mongoose.model('Question', questionSchema);
