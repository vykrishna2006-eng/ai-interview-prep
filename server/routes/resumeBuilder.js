const {
    generateResumeDocx
} = require("../utils/generator");
const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

// ==========================================
// Extract JSON safely from Gemini response
// ==========================================

function extractJSON(text) {

  let cleaned = text
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();

  try {
    return JSON.parse(cleaned);
  } catch (_) {}

  const match = cleaned.match(/\{[\s\S]*\}/);

  if (!match)
    throw new Error("Gemini returned invalid JSON.");

  return JSON.parse(match[0]);

}

// ==========================================
// Ask Gemini
// ==========================================

async function askGemini(prompt) {

  const result = await model.generateContent(prompt);

  return result.response.text();

}

// ==========================================
// Build Resume Prompt
// ==========================================

function buildResumePrompt(data) {

  return `
You are a Senior Resume Writer and ATS Optimization Expert.

Your task is to rewrite this resume into a highly professional ATS-friendly resume.

Candidate Information:

${JSON.stringify(data, null, 2)}

Requirements:

1. Improve every project.
2. Improve internship descriptions.
3. Improve summary.
4. Add quantified achievements wherever possible.
5. Categorize skills into:
   - Languages
   - Frameworks
   - Databases
   - Cloud
   - Tools
   - Core Subjects

6. Detect these links if available:
   - LinkedIn
   - GitHub
   - Portfolio
   - LeetCode
   - HackerRank
   - CodeChef

7. Make all bullet points strong and recruiter-friendly.

8. Keep resume one page.

Return ONLY valid JSON.

{
  "name":"",
  "email":"",
  "phone":"",
  "linkedin":"",
  "github":"",
  "portfolio":"",
  "leetcode":"",
  "hackerrank":"",
  "codechef":"",

  "summary":"",

  "skills":{

      "languages":[],
      "frameworks":[],
      "databases":[],
      "cloud":[],
      "tools":[],
      "core":[]
  },

  "education":[
      {
          "institution":"",
          "degree":"",
          "cgpa":"",
          "duration":""
      }
  ],

  "experience":[
      {
          "company":"",
          "role":"",
          "duration":"",
          "points":[]
      }
  ],

  "projects":[
      {
          "title":"",
          "techStack":"",
          "liveLink":"",
          "githubLink":"",
          "description":"",
          "points":[]
      }
  ],

  "certificates":[],

  "achievements":[],

  "languages":[],

  "resumeScore":95,

  "atsScore":98,

  "suggestions":[]
}
`;

}
// =====================================================
// AI Resume Generation
// =====================================================

router.post("/generate", protect, async (req, res) => {

  try {

    const resumeInput = req.body;

    console.log("\n========== AI Resume Builder ==========");

    const prompt = buildResumePrompt(resumeInput);

    const response = await askGemini(prompt);

    const resumeData = extractJSON(response);

    // -----------------------------
    // Default values
    // -----------------------------

    resumeData.name =
      resumeData.name || resumeInput.name || "";

    resumeData.email =
      resumeData.email || resumeInput.email || "";

    resumeData.phone =
      resumeData.phone || resumeInput.phone || "";

    resumeData.linkedin =
      resumeData.linkedin || "";

    resumeData.github =
      resumeData.github || "";

    resumeData.portfolio =
      resumeData.portfolio || "";

    resumeData.leetcode =
      resumeData.leetcode || "";

    resumeData.hackerrank =
      resumeData.hackerrank || "";

    resumeData.codechef =
      resumeData.codechef || "";

    resumeData.summary =
      resumeData.summary ||
      "Results-driven Software Engineer.";

    resumeData.education =
      resumeData.education || [];

    resumeData.experience =
      resumeData.experience || [];

    resumeData.projects =
      resumeData.projects || [];

    resumeData.certificates =
      resumeData.certificates || [];

    resumeData.achievements =
      resumeData.achievements || [];

    resumeData.languages =
      resumeData.languages || [];

    resumeData.skills =
      resumeData.skills || {

        languages:[],

        frameworks:[],

        databases:[],

        cloud:[],

        tools:[],

        core:[]

      };

    resumeData.resumeScore =
      resumeData.resumeScore || 90;

    resumeData.atsScore =
      resumeData.atsScore || 95;

    resumeData.suggestions =
      resumeData.suggestions || [];

    // -----------------------------
    // AI Suggestions
    // -----------------------------

    if (resumeData.projects.length < 3) {

      resumeData.suggestions.push(
        "Add one or two more technical projects."
      );

    }

    if (
      resumeData.skills.cloud.length === 0
    ) {

      resumeData.suggestions.push(
        "Adding AWS or Azure will improve ATS score."
      );

    }

    if (!resumeData.linkedin) {

      resumeData.suggestions.push(
        "Include your LinkedIn profile."
      );

    }

    if (!resumeData.github) {

      resumeData.suggestions.push(
        "Include your GitHub profile."
      );

    }

    if (!resumeData.leetcode) {

      resumeData.suggestions.push(
        "Include your LeetCode profile."
      );

    }
        console.log("Resume Generated Successfully.");

    // Generate the professional Word resume
    const file = await generateResumeDocx(resumeData);

    // Send response
    const baseUrl =
  process.env.SERVER_URL ||
  `${req.protocol}://${req.get("host")}`;

return res.json({
  success: true,
  resumeData,
  downloadUrl: `${baseUrl}/uploads/resumes/${file}`
});
  } catch (err) {

    console.log("\n===== Resume Builder Error =====");

    console.log(err);

    return res.status(500).json({

      success: false,

      message: err.message

    });

  }

});

module.exports = router;
