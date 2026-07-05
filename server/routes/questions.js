const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const Question = require('../models/Question');
const { generateQuestions } = require('../utils/aiEvaluator');

// Escape special regex characters in skill names (e.g. "C++" → "C\+\+")
function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// ==========================================
// Get Questions for One Skill
// ==========================================
router.get('/skill/:skill', protect, async (req, res) => {
  try {
    const { skill } = req.params;
    const count = parseInt(req.query.count) || 10;

    console.log(`\n========== ${skill} ==========`);

    // Search existing questions
    let questions = await Question.find({
      skill: { $regex: new RegExp(escapeRegex(skill), 'i') }
    }).limit(count);

    console.log(`Database Questions: ${questions.length}`);

    // Generate missing questions
    if (questions.length < count) {

      const needed = count - questions.length;

      console.log(`Generating ${needed} questions using Gemini...`);

      const aiQuestions = await generateQuestions(skill, needed);

      console.log("Gemini Returned:");
      console.log(aiQuestions);

      if (aiQuestions && aiQuestions.length > 0) {

        const savedQuestions = await Question.insertMany(
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
          }))
        );

        questions = [...questions, ...savedQuestions].slice(0, count);

      } else {

        console.log("Gemini returned 0 questions.");

      }
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
// Generate Complete Interview Test
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

    for (const skill of skills.slice(0, 8)) {

      console.log(`\n==============================`);
      console.log(`Generating Section: ${skill}`);
      console.log(`==============================`);

      let questions = await Question.find({
        skill: {
          $regex: new RegExp(escapeRegex(skill), "i")
        }
      }).limit(questionsPerSection);

      console.log(`Found ${questions.length} in database.`);

      if (questions.length < questionsPerSection) {

        const needed = questionsPerSection - questions.length;

        console.log(`Generating ${needed} new questions from Gemini...`);

        const aiQuestions = await generateQuestions(skill, needed);

        console.log("Gemini Response:");
        console.log(aiQuestions);

        if (aiQuestions && aiQuestions.length > 0) {

          const saved = await Question.insertMany(
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
            }))
          );

          questions = [...questions, ...saved].slice(0, questionsPerSection);

          console.log(`Saved ${saved.length} questions.`);

        } else {

          console.log(`Gemini returned NO questions for ${skill}`);

        }

      }

      sections[skill] = questions;

    }

    // ======================================
    // HR Section
    // ======================================

    console.log("\nGenerating HR Questions...");

    let hrQuestions = await Question.find({
      skill: /HR|Behavioral/i
    }).limit(10);

    if (hrQuestions.length < 5) {

      const aiHR = await generateQuestions(
        "HR and Behavioral",
        10
      );

      console.log("Gemini HR Response:");
      console.log(aiHR);

      if (aiHR && aiHR.length > 0) {

        const saved = await Question.insertMany(
          aiHR.map(q => ({
            skill: "HR",
            question: q.question,
            idealAnswer: q.idealAnswer,
            difficulty: q.difficulty || "medium",
            company: q.companies || [],
            tags: q.tags || [],
            options: q.options || [],
            correctOption: q.correctOption != null ? q.correctOption : undefined,
            source: "ai-generated"
          }))
        );

        hrQuestions = [...hrQuestions, ...saved].slice(0, 10);

      }

    }

    sections["HR"] = hrQuestions;

    // Guard: if every section is empty, something went wrong
    const totalQuestions = Object.values(sections).reduce((sum, qs) => sum + qs.length, 0);
    if (totalQuestions === 0) {
      return res.status(500).json({
        success: false,
        message: "Gemini could not generate questions. Check GEMINI_API_KEY and try again."
      });
    }

    return res.json({
      success: true,
      sections,
      skillsList: [...skills.slice(0, 8), "HR"]
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
// =====================================================
// Get Questions For One Skill
// =====================================================

router.get("/skill/:skill", protect, async (req, res) => {

  try {

    const skill = req.params.skill;

    const count =
      parseInt(req.query.count) || 10;

    console.log(
      `\n========== ${skill} ==========\n`
    );

    const questions =
      await getQuestionsForSkill(
        skill,
        count
      );

    if (!questions.length) {

      return res.status(404).json({

        success: false,

        message:
          "No questions found."

      });

    }

    console.log(

      `${skill} -> ${questions.length} questions returned.`

    );

    return res.json({

      success: true,

      skill,

      total: questions.length,

      questions

    });

  }

  catch (err) {

    console.log(
      "\n===== GET QUESTIONS ERROR ====="
    );

    console.log(err);

    return res.status(500).json({

      success: false,

      message: err.message

    });

  }

});
// =====================================================
// Generate Complete Interview Test
// =====================================================

router.post("/generate-test", protect, async (req, res) => {

  try {

    const {

      skills,

      questionsPerSection = 10

    } = req.body;

    if (

      !skills ||

      !Array.isArray(skills) ||

      skills.length === 0

    ) {

      return res.status(400).json({

        success: false,

        message: "Skills are required"

      });

    }

    const sections = {};

    const skillsList = [];

    // -----------------------------
    // Generate Technical Sections
    // -----------------------------

    for (const skill of skills.slice(0, 8)) {

      console.log(

        `\n==============================`

      );

      console.log(

        `Generating ${skill}`

      );

      console.log(

        `==============================`

      );

      const questions = await getQuestionsForSkill(

        skill,

        questionsPerSection

      );

      sections[skill] = questions;

      skillsList.push(skill);

    }

    // -----------------------------
    // HR Section
    // -----------------------------

    console.log(

      "\nGenerating HR Section..."

    );

    const hrQuestions = await getQuestionsForSkill(

      "HR",

      10

    );

    sections["HR"] = hrQuestions;

    skillsList.push("HR");

    // -----------------------------
    // Final Validation
    // -----------------------------

    let total = 0;

    Object.keys(sections).forEach(skill => {

      total += sections[skill].length;

      console.log(

        `${skill}: ${sections[skill].length}`

      );

    });

    if (total === 0) {

      return res.status(500).json({

        success: false,

        message:

          "Question generation failed."

      });

    }

    return res.json({

      success: true,

      totalQuestions: total,

      skillsList,

      sections

    });

  }

  catch (err) {

    console.log(

      "\n========== GENERATE TEST ERROR =========="

    );

    console.log(err);

    console.log(

      "=========================================\n"

    );

    return res.status(500).json({

      success: false,

      message: err.message

    });

  }

});

// =====================================================

module.exports = router;