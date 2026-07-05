# 🚀 InterviewGen AI
## Smart Resume Analyzer & AI Interview Preparation System

An AI-powered Interview Preparation platform that helps users analyze their resumes, generate interview questions, evaluate answers, build ATS-friendly resumes, and prepare for technical interviews using **Google Gemini AI**.

---

# 📌 Features

## 🔐 Authentication

- Email & Password Login
- Strong Password Validation
- JWT Authentication
- Google Login
- GitHub Login
- LinkedIn Login
- User Profile

---

## 📄 Resume Module

- Upload PDF Resume
- Upload DOCX Resume
- AI Resume Parsing
- Extract Skills
- Extract Projects
- Extract Experience
- Extract Education
- Extract Certificates
- Resume Score
- ATS Score
- Missing Skills Detection
- Resume Improvement Suggestions

---

## 🤖 AI Interview Preparation

- Resume-based Question Generation
- Skill-wise Question Generation
- Company-wise Questions
- Google Questions
- Amazon Questions
- Microsoft Questions
- Meta Questions
- Netflix Questions
- Adobe Questions
- Oracle Questions
- Difficulty Levels
  - Easy
  - Medium
  - Hard

---

## 🎤 AI Interview Test

- Voice Answer using Speech Recognition
- Text Answer
- AI Evaluation
- Concept Matching
- Accuracy Percentage
- Question-wise Marks
- Section-wise Marks
- Final Score
- Detailed Feedback

---

## 📊 Dashboard

- Resume Statistics
- ATS Score
- Resume Score
- Skill-wise Performance
- Test History
- Previous Results
- Performance Charts

---

## 📧 Report Generation

- Email Result
- PDF Report
- Correct Answers
- Wrong Answers
- AI Feedback
- Marks Summary

---

## 📑 Resume Builder

- AI Resume Generator
- ATS Friendly Resume
- Word Resume
- Overleaf Resume
- Professional Summary Generator
- Project Description Generator

---

# 🛠 Tech Stack

| Layer | Technology |
|--------|------------|
| Frontend | React.js |
| Build Tool | Vite |
| Styling | Tailwind CSS |
| Animation | Framer Motion |
| Backend | Node.js |
| Server | Express.js |
| Database | MongoDB Atlas |
| ODM | Mongoose |
| Authentication | JWT |
| OAuth | Google, GitHub, LinkedIn |
| AI | Google Gemini 2.5 Flash |
| Speech Recognition | Web Speech API |
| PDF | PDFKit |
| Email | Nodemailer |
| Deployment | Vercel + Render |

---

# 📂 Project Structure

```
InterviewGen AI
│
├── client
│   ├── public
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── utils
│   │   ├── store
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
│
├── server
│   ├── config
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── utils
│   │   ├── aiEvaluator.js
│   │   ├── resumeParser.js
│   │   ├── pdfGenerator.js
│   │   └── emailSender.js
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── README.md
└── .gitignore
```

---

# ⚙ Installation

## Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/InterviewGen-AI.git

cd InterviewGen-AI
```

---

## Backend

```bash
cd server

npm install
```

---

## Frontend

```bash
cd ../client

npm install
```

---

# 🔑 Environment Variables

Create

```
server/.env
```

Paste

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

SESSION_SECRET=your_session_secret

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

LINKEDIN_CLIENT_ID=your_linkedin_client_id
LINKEDIN_CLIENT_SECRET=your_linkedin_client_secret

GEMINI_API_KEY=your_gemini_api_key

EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password

CLIENT_URL=http://localhost:5173
```

---

# ▶ Run Project

## Backend

```bash
cd server

npm run dev
```

Backend runs at

```
http://localhost:5000
```

---

## Frontend

```bash
cd client

npm run dev
```

Frontend runs at

```
http://localhost:5173
```

---

# 🤖 Google Gemini Setup

1. Visit

```
https://aistudio.google.com/
```

2. Login

3. Click

```
Get API Key
```

4. Create API Key

5. Copy

```
....
```

6. Paste into

```env
GEMINI_API_KEY=YOUR_GEMINI_API
```

---

# 🌐 Google OAuth Setup

1. Go to

```
https://console.cloud.google.com
```

2. Create Project

3. Enable

```
Google People API
```

4. Configure OAuth Consent Screen

5. Create OAuth Client

6. Authorized Redirect URI

```
http://localhost:5000/api/auth/google/callback
```

7. Copy

```
GOOGLE_CLIENT_ID

GOOGLE_CLIENT_SECRET
```

---

# 🐙 GitHub OAuth

Go to

```
GitHub

Settings

Developer Settings

OAuth Apps
```

Create App

Homepage

```
http://localhost:5173
```

Callback

```
http://localhost:5000/api/auth/github/callback
```

Copy

```
Client ID

Client Secret
```

---

# 💼 LinkedIn OAuth

Go to

```
https://www.linkedin.com/developers/apps
```

Create App

Redirect URL

```
http://localhost:5000/api/auth/linkedin/callback
```

Copy

```
Client ID

Client Secret
```

---

# 📧 Gmail Setup

Enable

- 2-Step Verification

Create

App Password

Paste

```env
EMAIL_USER=example@gmail.com

EMAIL_PASS=xxxxxxxxxxxxxxxx
```

---

# ☁ Deployment

## Frontend

Deploy on

- Vercel

Build Command

```
npm run build
```

Output

```
dist
```

---

## Backend

Deploy on

Render

Build

```
npm install
```

Start

```
node server.js
```

---

## Database

MongoDB Atlas

Create Cluster

Whitelist IP

Create Database User

Copy Connection String

Paste

```env
MONGO_URI=
```

---

# 📊 AI Modules

- Resume Parser
- ATS Analyzer
- Resume Scoring
- Interview Question Generator
- Answer Evaluation
- Feedback Generator
- Resume Builder
- Company-wise Questions
- Technical Interview Preparation
- HR Interview Preparation

---

# 🎯 Future Improvements

- Coding Compiler
- Mock Video Interview
- AI Voice Interviewer
- Coding Challenges
- AI Cover Letter Generator
- Job Recommendation
- Company Dashboard
- Recruiter Dashboard
- Resume Comparison
- AI Career Advisor

---

# 👨‍💻 Developed By

**Yaswanth Krishna**

B.Tech CSE (AI & ML)

VIT-AP University

---

# ⭐ If you like this project

Give it a ⭐ on GitHub.