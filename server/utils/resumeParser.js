const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");
const fs = require("fs");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

// -----------------------------
// Extract text from PDF/DOCX
// -----------------------------
const extractTextFromFile = async (filePath, mimeType) => {
  const buffer = fs.readFileSync(filePath);

  if (
    mimeType === "application/pdf" ||
    filePath.toLowerCase().endsWith(".pdf")
  ) {
    const data = await pdfParse(buffer);
    return data.text;
  }

  if (
    mimeType ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    filePath.toLowerCase().endsWith(".docx")
  ) {
    const result = await mammoth.extractRawText({ buffer });
    return result.value;
  }

  if (filePath.toLowerCase().endsWith(".doc")) {
    const result = await mammoth.extractRawText({ buffer });
    return result.value;
  }

  return "";
};

// ------------------------------------
// Backup Skill Extractor
// ------------------------------------
function extractSkills(text) {
  const allSkills = [
    "Java",
    "Python",
    "C",
    "C++",
    "JavaScript",
    "TypeScript",
    "HTML",
    "CSS",
    "React",
    "Next.js",
    "Vue",
    "Angular",
    "Node.js",
    "Express",
    "Spring",
    "Spring Boot",
    "MongoDB",
    "MySQL",
    "PostgreSQL",
    "Oracle",
    "SQL",
    "Git",
    "GitHub",
    "Docker",
    "Kubernetes",
    "Linux",
    "AWS",
    "Azure",
    "GCP",
    "REST API",
    "GraphQL",
    "TensorFlow",
    "PyTorch",
    "Scikit-learn",
    "Machine Learning",
    "Deep Learning",
    "NLP",
    "Artificial Intelligence",
    "Data Structures",
    "Algorithms",
    "OOP",
    "Operating System",
    "DBMS",
    "Computer Networks",
    "Cloud Computing",
    "Firebase",
    "Redis",
    "Bootstrap",
    "Tailwind CSS",
    "Vite",
    "MERN",
    "JWT",
    "OAuth",
    "FastAPI",
    "Flask",
    "Django"
  ];

  const lower = text.toLowerCase();

  return allSkills.filter(skill =>
    lower.includes(skill.toLowerCase())
  );
}

// ------------------------------------
// Parse Resume
// ------------------------------------
const parseResumeWithAI = async (text) => {

  const prompt = `
You are a professional ATS Resume Parser.

Analyze the following resume.

Resume:

${text.substring(0,7000)}

Extract ALL information.

Return ONLY VALID JSON.

{
  "name":"",
  "email":"",
  "phone":"",
  "college":"",
  "cgpa":"",
  "summary":"",
  "skills":[],
  "projects":[
    {
      "title":"",
      "description":""
    }
  ],
  "experience":[
    {
      "company":"",
      "role":"",
      "duration":""
    }
  ],
  "certificates":[],
  "languages":[],
  "resumeScore":85,
  "missingSkills":[],
  "suggestions":[],
  "atsScore":90
}

IMPORTANT:

Extract EVERY technology mentioned.

Include Programming Languages.

Include Frameworks.

Include Databases.

Include Cloud.

Include AI tools.

Include all libraries.

If AWS, React, MongoDB, Java, Python, TensorFlow etc are present, include them inside skills.

Resume Score should be 0-100.

ATS Score should be 0-100.

Give 5 improvement suggestions.

Suggest missing trending skills.

Return JSON ONLY.
`;

  try {

    const result = await model.generateContent(prompt);

    const response = result.response.text();

    console.log("\n========== GEMINI RESPONSE ==========\n");
    console.log(response);
    console.log("\n=====================================\n");

    const json = response.match(/\{[\s\S]*\}/);

    if (!json) {
      throw new Error("Gemini did not return valid JSON");
    }

    const parsed = JSON.parse(json[0]);

    // ------------------------
    // Backup Skill Detection
    // ------------------------
    if (!parsed.skills || parsed.skills.length === 0) {
      parsed.skills = extractSkills(text);
    }

    // Remove duplicates
    parsed.skills = [...new Set(parsed.skills)];

    return parsed;

  } catch (err) {

    console.log("Gemini Parser Error:");
    console.log(err);

    return {
      name: "",
      email: "",
      phone: "",
      college: "",
      cgpa: "",
      summary: "",
      skills: extractSkills(text),
      projects: [],
      experience: [],
      certificates: [],
      languages: [],
      resumeScore: 70,
      missingSkills: [
        "Docker",
        "Kubernetes",
        "CI/CD"
      ],
      suggestions: [
        "Add measurable achievements.",
        "Improve ATS keywords.",
        "Include more technical projects.",
        "Mention certifications.",
        "Keep resume within one page."
      ],
      atsScore: 65
    };

  }

};

module.exports = {
  extractTextFromFile,
  parseResumeWithAI
};