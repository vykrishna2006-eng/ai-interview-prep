const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { protect } = require('../middleware/authMiddleware');
const Resume = require('../models/Resume');
const { extractTextFromFile, parseResumeWithAI } = require('../utils/resumeParser');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, '../uploads/resumes');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, `${req.user._id}_${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = ['.pdf', '.doc', '.docx'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowed.includes(ext)) cb(null, true);
    else cb(new Error('Only PDF, DOC, DOCX files are allowed'));
  }
});

// Upload and parse resume
router.post('/upload', protect, upload.single('resume'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: 'No file uploaded' });

    const text = await extractTextFromFile(req.file.path, req.file.mimetype);
    const parsed = await parseResumeWithAI(text);

    const resume = await Resume.create({
      user: req.user._id,
      fileName: req.file.originalname,
      filePath: req.file.path,
      parsedData: {
        name: parsed.name || req.user.name,
        email: parsed.email || req.user.email,
        phone: parsed.phone || '',
        college: parsed.college || '',
        cgpa: parsed.cgpa || '',
        summary: parsed.summary || '',
        skills: parsed.skills || [],
        projects: parsed.projects || [],
        experience: parsed.experience || [],
        certificates: parsed.certificates || [],
        languages: parsed.languages || []
      },
      resumeScore: parsed.resumeScore || 75,
      missingSkills: parsed.missingSkills || [],
      suggestions: parsed.suggestions || [],
      atsScore: parsed.atsScore || 70
    });

    res.json({ success: true, resume });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Get user's latest resume
router.get('/latest', protect, async (req, res) => {
  try {
    const resume = await Resume.findOne({ user: req.user._id }).sort({ createdAt: -1 });
    if (!resume) return res.status(404).json({ success: false, message: 'No resume found' });
    res.json({ success: true, resume });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Get all resumes
router.get('/all', protect, async (req, res) => {
  try {
    const resumes = await Resume.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json({ success: true, resumes });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
