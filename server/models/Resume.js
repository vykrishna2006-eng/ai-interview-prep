const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  fileName: { type: String },
  filePath: { type: String },
  parsedData: {
    name: String,
    email: String,
    phone: String,
    college: String,
    cgpa: String,
    skills: [String],
    projects: [{ title: String, description: String }],
    experience: [{ company: String, role: String, duration: String }],
    certificates: [String],
    languages: [String],
    summary: String
  },
  resumeScore: { type: Number, default: 0 },
  missingSkills: [String],
  suggestions: [String],
  atsScore: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Resume', resumeSchema);
