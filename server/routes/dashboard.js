const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const TestResult = require('../models/TestResult');
const Resume = require('../models/Resume');
const User = require('../models/User');

router.get('/stats', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const latestResume = await Resume.findOne({ user: req.user._id }).sort({ createdAt: -1 });
    const recentTests = await TestResult.find({ user: req.user._id, status: 'completed' })
      .sort({ createdAt: -1 })
      .limit(5)
      .select('overallPercentage sectionResults createdAt');

    // Skill performance across all tests
    const allTests = await TestResult.find({ user: req.user._id, status: 'completed' });
    const skillMap = {};
    allTests.forEach(test => {
      test.sectionResults.forEach(s => {
        if (!skillMap[s.skill]) skillMap[s.skill] = { total: 0, count: 0 };
        skillMap[s.skill].total += s.percentage;
        skillMap[s.skill].count += 1;
      });
    });

    const skillPerformance = Object.entries(skillMap).map(([skill, data]) => ({
      skill,
      avgScore: Math.round(data.total / data.count),
      status: data.total / data.count >= 70 ? 'Strong' :
              data.total / data.count >= 50 ? 'Average' : 'Needs Improvement'
    }));

    res.json({
      success: true,
      stats: {
        name: user.name,
        avatar: user.avatar,
        testsCompleted: user.testsCompleted,
        averageScore: user.averageScore,
        badges: user.badges,
        streak: user.streak,
        resumeScore: latestResume?.resumeScore || 0,
        skills: latestResume?.parsedData?.skills || [],
        skillPerformance,
        recentTests
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
