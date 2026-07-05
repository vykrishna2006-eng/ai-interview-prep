const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const TestResult = require('../models/TestResult');
const { evaluateAnswer } = require('../utils/aiEvaluator');

// Evaluate a single answer
router.post('/answer', protect, async (req, res) => {
  try {
    const { question, userAnswer, idealAnswer, skill } = req.body;
    const result = await evaluateAnswer(question, userAnswer, idealAnswer, skill);
    res.json({ success: true, result });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Submit section and get section score
router.post('/section', protect, async (req, res) => {
  try {
    const { testId, skill, answers } = req.body;

    let totalScore = 0;
    const evaluated = [];

    for (const ans of answers) {
      const result = await evaluateAnswer(ans.question, ans.userAnswer, ans.idealAnswer, skill);
      evaluated.push({
        questionId: ans.questionId,
        question: ans.question,
        skill,
        userAnswer: ans.userAnswer || '',
        idealAnswer: ans.idealAnswer,
        isCorrect: result.isCorrect,
        score: result.score,
        maxScore: 2,
        aiFeedback: result.feedback,
        accuracyPercent: result.accuracyPercent
      });
      totalScore += result.score;
    }

    const maxScore = answers.length * 2;
    const percentage = Math.round((totalScore / maxScore) * 100);
    const correct = evaluated.filter(e => e.isCorrect).length;

    // Update or create test result
    let testResult;
    if (testId) {
      testResult = await TestResult.findById(testId);
    }

    if (!testResult) {
      testResult = new TestResult({ user: req.user._id, answers: [], sectionResults: [] });
    }

    // Remove old answers for this skill
    testResult.answers = testResult.answers.filter(a => a.skill !== skill);
    testResult.answers.push(...evaluated);

    // Remove old section result
    testResult.sectionResults = testResult.sectionResults.filter(s => s.skill !== skill);
    testResult.sectionResults.push({
      skill,
      totalQuestions: answers.length,
      attempted: evaluated.filter(e => e.userAnswer).length,
      correct,
      score: totalScore,
      maxScore,
      percentage
    });

    await testResult.save();

    res.json({
      success: true,
      testId: testResult._id,
      sectionResult: { skill, score: totalScore, maxScore, percentage, correct, total: answers.length },
      evaluatedAnswers: evaluated
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Get test result
router.get('/result/:testId', protect, async (req, res) => {
  try {
    const test = await TestResult.findById(req.params.testId);
    if (!test) return res.status(404).json({ success: false, message: 'Test not found' });
    res.json({ success: true, test });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Get all test history
router.get('/history', protect, async (req, res) => {
  try {
    const tests = await TestResult.find({ user: req.user._id, status: 'completed' })
      .sort({ createdAt: -1 })
      .select('-answers');
    res.json({ success: true, tests });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
