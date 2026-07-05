const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash"
});

// -------------------------
// Gemini Call
// -------------------------

async function askGemini(prompt) {

  const result = await model.generateContent({
    contents: [
      {
        role: "user",
        parts: [
          {
            text: prompt
          }
        ]
      }
    ],
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 8192
    }
  });

  return result.response.text();
}

// -------------------------
// Extract JSON
// -------------------------

function extractJSON(text) {

  let cleaned = text
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();

  try {
    return JSON.parse(cleaned);
  } catch {}

  const array = cleaned.match(/\[[\s\S]*\]/);

  if (array) {

    try {
      return JSON.parse(array[0]);
    } catch {}

  }

  const object = cleaned.match(/\{[\s\S]*\}/);

  if (object) {

    try {
      return JSON.parse(object[0]);
    } catch {}

  }

  throw new Error("Gemini returned invalid JSON.");

}

// -------------------------
// Validate Question
// -------------------------

function validateQuestion(q, skill) {

  if (!q.question)
    return false;

  if (!q.idealAnswer)
    return false;

  if (!Array.isArray(q.tags))
    q.tags = [skill];

  if (!Array.isArray(q.companies))
    q.companies = [];

  if (!Array.isArray(q.options) || q.options.length !== 4) {

    q.options = [

      "Option A",

      "Option B",

      "Option C",

      "Option D"

    ];

    q.correctOption = 0;

  }

  if (
    q.correctOption === undefined ||
    q.correctOption < 0 ||
    q.correctOption > 3
  ) {

    q.correctOption = 0;

  }

  if (!q.difficulty)
    q.difficulty = "medium";

  return true;

}

// -------------------------
// Remove Duplicate Questions
// -------------------------

function removeDuplicates(list) {

  const seen = new Set();

  const result = [];

  for (const q of list) {

    if (!seen.has(q.question)) {

      seen.add(q.question);

      result.push(q);

    }

  }

  return result;

}

// -------------------------
// Delay
// -------------------------

function sleep(ms) {

  return new Promise(resolve => setTimeout(resolve, ms));

}
// ======================================================
// Evaluate Candidate Answer
// ======================================================

const evaluateAnswer = async (
  question,
  userAnswer,
  idealAnswer,
  skill
) => {

  if (!userAnswer || userAnswer.trim().length < 3) {

    return {

      isCorrect: false,

      score: 0,

      accuracyPercent: 0,

      conceptCorrect: false,

      feedback: "No answer provided.",

      strengths: [],

      improvements: ["Please answer the question."]

    };

  }

  const prompt = `
You are an experienced FAANG interviewer.

Evaluate the candidate's answer.

Skill:
${skill}

Question:
${question}

Ideal Answer:
${idealAnswer}

Candidate Answer:
${userAnswer}

Scoring Rules:

2 marks
---------
Candidate understands the concept correctly.
Even if the answer is short, give full marks.

1 mark
---------
Concept is partially correct.

0 marks
---------
Wrong answer.

Return ONLY JSON.

{
"isCorrect":true,
"score":2,
"accuracyPercent":92,
"conceptCorrect":true,
"feedback":"...",
"strengths":["..."],
"improvements":["..."]
}
`;

  try {

    const response = await askGemini(prompt);

    console.log("\n===== GEMINI EVALUATION =====\n");
    console.log(response);
    console.log("\n=============================\n");

    const parsed = extractJSON(response);

    parsed.score = Number(parsed.score);

    if (isNaN(parsed.score))
      parsed.score = 0;

    if (parsed.score < 0)
      parsed.score = 0;

    if (parsed.score > 2)
      parsed.score = 2;

    parsed.isCorrect = parsed.score >= 2;

    parsed.accuracyPercent =
      Number(parsed.accuracyPercent) || 0;

    parsed.conceptCorrect =
      parsed.score >= 1;

    if (!Array.isArray(parsed.strengths))
      parsed.strengths = [];

    if (!Array.isArray(parsed.improvements))
      parsed.improvements = [];

    if (!parsed.feedback)
      parsed.feedback = "";

    return parsed;

  } catch (err) {

    console.log("\nGemini Evaluation Failed\n");
    console.log(err);

    // -----------------------------
    // Backup Evaluation
    // -----------------------------

    const keywords = idealAnswer
      .toLowerCase()
      .replace(/[^a-z0-9 ]/g, "")
      .split(/\s+/)
      .filter(word => word.length > 4);

    const answer = userAnswer
      .toLowerCase();

    let matched = 0;

    for (const word of keywords) {

      if (answer.includes(word))
        matched++;

    }

    const accuracy = Math.round(

      (matched / Math.max(1, keywords.length)) * 100

    );

    let score = 0;

    if (accuracy >= 70)
      score = 2;

    else if (accuracy >= 40)
      score = 1;

    else
      score = 0;

    return {

      isCorrect: score === 2,

      score,

      accuracyPercent: accuracy,

      conceptCorrect: score >= 1,

      feedback:
        score === 2
          ? "Good answer."
          : score === 1
          ? "Partially correct."
          : "Incorrect answer.",

      strengths:
        score === 2
          ? ["Understood the concept."]
          : [],

      improvements:
        score === 2
          ? []
          : ["Explain the core concept more clearly."]

    };

  }

};
// ======================================================
// Generate Questions Batch
// ======================================================

async function generateQuestionsBatch(skill, count) {

  const MAX_BATCH = 10;

  let questions = [];

  let remaining = count;

  while (remaining > 0) {

    const batchSize = Math.min(MAX_BATCH, remaining);

    const prompt = `
You are an expert technical interviewer working for FAANG companies.

Generate EXACTLY ${batchSize} interview questions for the skill "${skill}".

Difficulty should contain a mix of:
- Easy
- Medium
- Hard

Every question MUST contain:

{
  "question":"",
  "idealAnswer":"",
  "difficulty":"easy|medium|hard",
  "tags":["${skill}"],
  "companies":["Google","Amazon","Microsoft"],
  "options":[
    "...",
    "...",
    "...",
    "..."
  ],
  "correctOption":0
}

Rules:

1. EXACTLY ${batchSize} questions.

2. Every question MUST have 4 MCQ options.

3. ONLY ONE option is correct.

4. correctOption must be between 0 and 3.

5. idealAnswer should be 2-4 lines.

6. Return ONLY JSON ARRAY.

7. NO markdown.

8. NO explanation.

`;

    let success = false;

    for (let attempt = 1; attempt <= 3 && !success; attempt++) {

      try {

        console.log(
          `Generating ${skill} Batch (${batchSize}) Attempt ${attempt}`
        );

        const response = await askGemini(prompt);

        const parsed = extractJSON(response);

        const batch = Array.isArray(parsed)
          ? parsed
          : Array.isArray(parsed.questions)
          ? parsed.questions
          : [];

        const valid = [];

        for (const q of batch) {

          if (validateQuestion(q, skill)) {

            valid.push(q);

          }

        }

        if (valid.length > 0) {

          questions.push(...valid);

          success = true;

        }

      } catch (err) {

        console.log(
          `Attempt ${attempt} failed for ${skill}`
        );

        console.log(err.message);

        await sleep(1000);

      }

    }

    if (!success) {

      console.log(
        `Gemini failed completely for ${skill}`
      );

      break;

    }

    remaining = count - questions.length;

  }

  questions = removeDuplicates(questions);

  if (questions.length > count) {

    questions = questions.slice(0, count);

  }

  console.log(
    `${skill} -> Generated ${questions.length} questions`
  );

  return questions;

}
// ======================================================
// Fallback Questions
// ======================================================

function getFallbackQuestions(skill, count) {

  const fallback = [];

  for (let i = 1; i <= count; i++) {

    fallback.push({

      question: `Explain the fundamental concepts of ${skill}. (${i})`,

      idealAnswer: `${skill} is an important technology. A good answer should explain the core concepts, real-world usage, advantages, limitations, and practical examples.`,

      difficulty:
        i % 3 === 0
          ? "hard"
          : i % 2 === 0
          ? "medium"
          : "easy",

      tags: [skill],

      companies: [
        "Google",
        "Amazon",
        "Microsoft",
        "Meta"
      ],

      options: [
        "Correct explanation",
        "Incorrect option A",
        "Incorrect option B",
        "Incorrect option C"
      ],

      correctOption: 0

    });

  }

  return fallback;

}

// ======================================================
// Generate Questions
// ======================================================

const generateQuestions = async (

  skill,

  count = 10,

  difficulty = "mixed"

) => {

  try {

    let questions = await generateQuestionsBatch(

      skill,

      count

    );

    questions = removeDuplicates(questions);

    if (questions.length < count) {

      console.log(

        `Only ${questions.length} questions generated for ${skill}. Adding fallback questions...`

      );

      const fallback = getFallbackQuestions(

        skill,

        count - questions.length

      );

      questions.push(...fallback);

    }

    questions = questions.slice(0, count);

    console.log(

      `Final Question Count (${skill}): ${questions.length}`

    );

    return questions;

  } catch (err) {

    console.log(

      "Question Generation Failed"

    );

    console.log(err);

    return getFallbackQuestions(skill, count);

  }

};

// ======================================================
// Exports
// ======================================================

module.exports = {

  evaluateAnswer,

  generateQuestions

};