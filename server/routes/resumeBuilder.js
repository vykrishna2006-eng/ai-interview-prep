const {
    generateResumeDocx
} = require("../utils/generator");
const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const { protect } = require("../middleware/authMiddleware");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

const resumeFolder = path.join(__dirname, "..", "uploads", "resumes");

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

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
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

Return ONLY valid JSON, no markdown, no explanation.

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

// ==========================================
// Ask Gemini for resume JSON, with retries.
// Returns null (never throws) if every attempt fails, so the caller
// can fall back to a plain, non-AI-enhanced resume instead of failing
// the whole request.
// ==========================================

async function generateResumeDataWithRetry(resumeInput, attempts = 3) {

  const prompt = buildResumePrompt(resumeInput);

  for (let attempt = 1; attempt <= attempts; attempt++) {

    try {

      console.log(`Gemini resume generation attempt ${attempt}/${attempts}...`);

      const response = await askGemini(prompt);

      return extractJSON(response);

    } catch (err) {

      console.log(`Attempt ${attempt} failed:`, err.message);

      if (attempt < attempts) {
        await sleep(1000);
      }

    }

  }

  console.log("All Gemini attempts failed. Falling back to a non-AI resume.");

  return null;

}

// ==========================================
// Build a safe fallback resumeData object directly
// from the user's raw form input, used only if Gemini
// fails completely. Guarantees the docx step always runs.
// ==========================================

function buildFallbackResumeData(resumeInput) {

  return {
    name: resumeInput.name || "",
    email: resumeInput.email || "",
    phone: resumeInput.phone || "",
    linkedin: resumeInput.linkedin || "",
    github: resumeInput.github || "",
    portfolio: resumeInput.portfolio || "",
    leetcode: resumeInput.leetcode || "",
    hackerrank: resumeInput.hackerrank || "",
    codechef: resumeInput.codechef || "",
    summary: resumeInput.targetRole
      ? `Motivated ${resumeInput.targetRole} with hands-on project and academic experience.`
      : "Results-driven Software Engineer.",
    skills: {
      languages: resumeInput.skills || [],
      frameworks: [],
      databases: [],
      cloud: [],
      tools: [],
      core: []
    },
    education: (resumeInput.education || []).map(e => ({
      institution: e.institution || "",
      degree: e.degree || "",
      cgpa: e.gpa || "",
      duration: e.year || ""
    })),
    experience: (resumeInput.experience || []).map(e => ({
      company: e.company || "",
      role: e.role || "",
      duration: e.duration || "",
      points: []
    })),
    projects: (resumeInput.projects || []).map(p => ({
      title: p.title || "",
      techStack: p.tech || "",
      liveLink: "",
      githubLink: "",
      description: p.description || "",
      points: []
    })),
    certificates: resumeInput.certificates || [],
    achievements: [],
    languages: [],
    resumeScore: 75,
    atsScore: 80,
    suggestions: [
      "This resume was generated without AI enhancement because our AI service was temporarily unavailable. You can try generating again for AI-polished wording."
    ]
  };

}

// =====================================================
// AI Resume Generation
// =====================================================

router.post("/generate", protect, async (req, res) => {

  try {

    const resumeInput = req.body;

    console.log("\n========== AI Resume Builder ==========");

    let resumeData = await generateResumeDataWithRetry(resumeInput, 3);

    if (!resumeData) {
      resumeData = buildFallbackResumeData(resumeInput);
    }

    // -----------------------------
    // Default values (guards against missing/partial Gemini output)
    // -----------------------------

    resumeData.name = resumeData.name || resumeInput.name || "";
    resumeData.email = resumeData.email || resumeInput.email || "";
    resumeData.phone = resumeData.phone || resumeInput.phone || "";
    resumeData.linkedin = resumeData.linkedin || "";
    resumeData.github = resumeData.github || "";
    resumeData.portfolio = resumeData.portfolio || "";
    resumeData.leetcode = resumeData.leetcode || "";
    resumeData.hackerrank = resumeData.hackerrank || "";
    resumeData.codechef = resumeData.codechef || "";
    resumeData.summary = resumeData.summary || "Results-driven Software Engineer.";
    resumeData.education = resumeData.education || [];
    resumeData.experience = resumeData.experience || [];
    resumeData.projects = resumeData.projects || [];
    resumeData.certificates = resumeData.certificates || [];
    resumeData.achievements = resumeData.achievements || [];
    resumeData.languages = resumeData.languages || [];

    resumeData.skills = resumeData.skills || {
      languages: [],
      frameworks: [],
      databases: [],
      cloud: [],
      tools: [],
      core: []
    };

    resumeData.resumeScore = resumeData.resumeScore || 90;
    resumeData.atsScore = resumeData.atsScore || 95;
    resumeData.suggestions = resumeData.suggestions || [];

    // -----------------------------
    // AI Suggestions
    // -----------------------------

    if (resumeData.projects.length < 3) {
      resumeData.suggestions.push("Add one or two more technical projects.");
    }

    if ((resumeData.skills.cloud || []).length === 0) {
      resumeData.suggestions.push("Adding AWS or Azure will improve ATS score.");
    }

    if (!resumeData.linkedin) {
      resumeData.suggestions.push("Include your LinkedIn profile.");
    }

    if (!resumeData.github) {
      resumeData.suggestions.push("Include your GitHub profile.");
    }

    if (!resumeData.leetcode) {
      resumeData.suggestions.push("Include your LeetCode profile.");
    }

    console.log("Resume data ready. Generating .docx...");

    // Generate the professional Word resume.
    // If this throws, we want a clear 500 rather than a silently
    // "successful" response with no file, so we don't catch it here.
    const file = await generateResumeDocx(resumeData);

    console.log("Word resume created:", file);

    // Return a RELATIVE download path through our own dedicated
    // download route (below) — never a full absolute URL, so the
    // frontend can safely prepend its own API origin exactly once.
    return res.json({
      success: true,
      resumeData,
      downloadUrl: `/api/resume-builder/download/${encodeURIComponent(file)}`
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

// =====================================================
// Download Generated Resume (.docx)
// =====================================================
// Not behind `protect`: the /uploads static folder was already
// publicly reachable before this route existed, so this doesn't
// change the security model. What it DOES fix is forcing a real
// browser "Save File" download via Content-Disposition, instead of
// the file sometimes opening blank/inline in a new tab.

router.get("/download/:filename", (req, res) => {

  const filename = req.params.filename;

  // Prevent path traversal — only allow a bare filename, no slashes.
  if (filename.includes("..") || filename.includes("/") || filename.includes("\\")) {
    return res.status(400).json({ success: false, message: "Invalid filename" });
  }

  const filePath = path.join(resumeFolder, filename);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ success: false, message: "Resume file not found" });
  }

  res.download(filePath, filename, (err) => {
    if (err) {
      console.log("Download error:", err.message);
    }
  });

});

module.exports = router;
