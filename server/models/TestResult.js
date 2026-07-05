const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
  question: String,
  skill: String,
  userAnswer: String,
  idealAnswer: String,
  isCorrect: Boolean,
  score: Number,
  maxScore: { type: Number, default: 2 },
  aiFeedback: String,
  accuracyPercent: Number
});

const sectionResultSchema = new mongoose.Schema({
  skill: String,
  totalQuestions: Number,
  attempted: Number,
  correct: Number,
  score: Number,
  maxScore: Number,
  percentage: Number
});

const testResultSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  resume: { type: mongoose.Schema.Types.ObjectId, ref: 'Resume' },
  answers: [answerSchema],
  sectionResults: [sectionResultSchema],
  overallScore: { type: Number, default: 0 },
  overallPercentage: { type: Number, default: 0 },
  totalQuestions: { type: Number, default: 0 },
  attempted: { type: Number, default: 0 },
  correct: { type: Number, default: 0 },
  status: { type: String, enum: ['in-progress', 'completed'], default: 'in-progress' },
  pdfPath: { type: String },
  emailSent: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('TestResult', testResultSchema);
