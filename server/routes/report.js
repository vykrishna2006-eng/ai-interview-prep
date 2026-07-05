const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const { protect } = require('../middleware/authMiddleware');
const TestResult = require('../models/TestResult');
const { generateTestReportPDF } = require('../utils/pdfGenerator');
const { sendTestReportEmail } = require('../utils/emailSender');

// Submit full test, compute final score, generate PDF, send email
router.post('/submit/:testId', protect, async (req, res) => {
  try {
    const test = await TestResult.findById(req.params.testId);
    if (!test) return res.status(404).json({ success: false, message: 'Test not found' });

    // Calculate overall
    const totalScore = test.sectionResults.reduce((s, r) => s + r.score, 0);
    const totalMax = test.sectionResults.reduce((s, r) => s + r.maxScore, 0);
    const totalCorrect = test.sectionResults.reduce((s, r) => s + r.correct, 0);
    const totalQuestions = test.sectionResults.reduce((s, r) => s + r.totalQuestions, 0);

    test.overallScore = totalScore;
    test.overallPercentage = Math.round((totalScore / totalMax) * 100);
    test.totalQuestions = totalQuestions;
    test.correct = totalCorrect;
    test.attempted = test.answers.filter(a => a.userAnswer).length;
    test.status = 'completed';

    // Generate PDF
    const pdfDir = path.join(__dirname, '../uploads/reports');
    if (!fs.existsSync(pdfDir)) fs.mkdirSync(pdfDir, { recursive: true });
    const pdfPath = path.join(pdfDir, `report_${test._id}.pdf`);

    await generateTestReportPDF(test, req.user, pdfPath);
    test.pdfPath = pdfPath;

    // Update user stats
    const User = require('../models/User');
    const user = await User.findById(req.user._id);
    user.testsCompleted = (user.testsCompleted || 0) + 1;
    const prevAvg = user.averageScore || 0;
    user.averageScore = Math.round(
      (prevAvg * (user.testsCompleted - 1) + test.overallPercentage) / user.testsCompleted
    );

    // Award badges
    test.sectionResults.forEach(s => {
      if (s.percentage >= 90) {
        const badge = `${s.skill} Expert`;
        if (!user.badges.includes(badge)) user.badges.push(badge);
      }
    });

    await user.save();
    await test.save();

    // Send email
    try {
      await sendTestReportEmail(req.user, test, pdfPath);
      test.emailSent = true;
      await test.save();
    } catch (emailErr) {
      console.log('Email error (non-fatal):', emailErr.message);
    }

    res.json({
      success: true,
      message: 'Test submitted successfully',
      result: {
        testId: test._id,
        overallScore: test.overallScore,
        overallPercentage: test.overallPercentage,
        totalQuestions: test.totalQuestions,
        correct: test.correct,
        sectionResults: test.sectionResults,
        emailSent: test.emailSent
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Download PDF report
router.get('/pdf/:testId', protect, async (req, res) => {
  try {
    const test = await TestResult.findById(req.params.testId);
    if (!test || !test.pdfPath) {
      return res.status(404).json({ success: false, message: 'PDF not found' });
    }
    res.download(test.pdfPath, `InterviewReport_${req.params.testId}.pdf`);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
