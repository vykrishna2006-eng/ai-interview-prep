const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const Question = require('../models/Question');
const { generateQuestions } = require('../utils/aiEvaluator');

// ==========================================
// Helper: Generate + Save Fresh Gemini Questions
// ==========================================
// Always calls Gemini directly for `count` NEW questions instead of
// reusing whatever is already sitting in the Question collection from
// earlier tests. Successful generations are still stored in Mongo so you
// keep a historical record / can reuse them elsewhere, but they are never
// read back to serve a "Generate Questions" click.
async function getFreshQuestions(skill, count) {

  console.log(`Generating ${count} FRESH questions for "${skill}" via Gemini...`);

  const aiQuestions = await generateQuestions(skill, count);

  if (!aiQuestions || aiQuestions.length === 0) {
    console.log(`Gemini returned 0 questions for ${skill}.`);
    return [];
  }

  let saved = [];

  try {
    saved = await Question.insertMany(
      aiQuestions.map(q => ({
        skill,
        question: q.question,
        idealAnswer: q.idealAnswer,
        difficulty: q.difficulty || "medium",
        company: q.companies || [],
        tags: q.tags || [],
        options: q.options || [],
        correctOption: q.correctOption != null ? q.correctOption : undefined,
        source: "ai-generated"
      })),
      { ordered: false }
    );
  } catch (err) {
    // insertMany can partially fail on duplicate-key style validation issues;
    // that's fine, we still return the freshly generated questions to the user.
    console.log("Note: some generated questions were not saved to DB:", err.message);
    saved = aiQuestions;
  }

  return saved.slice(0, count);
}

// ==========================================
// Get Questions for One Skill (always fresh)
// ==========================================
router.get('/skill/:skill', protect, async (req, res) => {
  try {
    const { skill } = req.params;
    const count = parseInt(req.query.count) || 10;

    console.log(`\n========== ${skill} ==========`);

    const questions = await getFreshQuestions(skill, count);

    if (!questions.length) {
      return res.status(500).json({
        success: false,
        message: "Gemini could not generate questions. Check GEMINI_API_KEY and try again."
      });
    }

    return res.json({
      success: true,
      skill,
      total: questions.length,
      questions
    });

  } catch (err) {

    console.error("\n===== GET SKILL QUESTIONS ERROR =====");
    console.error(err);

    return res.status(500).json({
      success: false,
      message: err.message
    });

  }
});

// ==========================================
// Generate Complete Interview Test (always fresh)
// ==========================================
router.post('/generate-test', protect, async (req, res) => {

  try {

    const {
      skills,
      questionsPerSection = 10
    } = req.body;

    if (!skills || !Array.isArray(skills) || skills.length === 0) {

      return res.status(400).json({
        success: false,
        message: "Skills are required"
      });

    }

    const sections = {};
    const skillsList = [];

    // -----------------------------
    // Technical Sections
    // -----------------------------
    for (const skill of skills.slice(0, 8)) {

      console.log(`\n==============================`);
      console.log(`Generating Section: ${skill}`);
      console.log(`==============================`);

      const questions = await getFreshQuestions(skill, questionsPerSection);

      sections[skill] = questions;
      skillsList.push(skill);

    }

    // -----------------------------
    // HR Section
    // -----------------------------
    console.log("\nGenerating HR Questions...");

    const hrQuestions = await getFreshQuestions("HR and Behavioral", 10);

    sections["HR"] = hrQuestions;
    skillsList.push("HR");

    // -----------------------------
    // Final Validation
    // -----------------------------
    let totalQuestions = 0;

    Object.keys(sections).forEach(skill => {
      totalQuestions += sections[skill].length;
      console.log(`${skill}: ${sections[skill].length}`);
    });

    if (totalQuestions === 0) {
      return res.status(500).json({
        success: false,
        message: "Gemini could not generate questions. Check GEMINI_API_KEY and try again."
      });
    }

    return res.json({
      success: true,
      totalQuestions,
      sections,
      skillsList
    });

  } catch (err) {

    console.error("\n=========== GENERATE TEST ERROR ===========");
    console.error(err);
    console.error("===========================================\n");

    return res.status(500).json({
      success: false,
      message: err.message
    });

  }

});

module.exports = router;
