const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const session = require("express-session");
const passport = require("passport");
const path = require("path");

// Load environment variables
dotenv.config();

const app = express();

// ===============================
// Debug Environment Variables
// ===============================
console.log("=================================");
console.log("PORT:", process.env.PORT);
console.log("CLIENT_URL:", process.env.CLIENT_URL);
console.log("MONGO_URI:", process.env.MONGO_URI);
console.log("=================================");

// ===============================
// Middleware
// ===============================
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ===============================
// Session
// ===============================
app.use(
  session({
    secret: process.env.SESSION_SECRET || "InterviewPrepSessionSecret@2026",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

// ===============================
// Passport
// ===============================
app.use(passport.initialize());
app.use(passport.session());

require("./config/passport")(passport);

// ===============================
// API Routes
// ===============================
app.use("/api/auth", require("./routes/auth"));
app.use("/api/resume", require("./routes/resume"));
app.use("/api/questions", require("./routes/questions"));
app.use("/api/evaluate", require("./routes/evaluate"));
app.use("/api/report", require("./routes/report"));
app.use("/api/resume-builder", require("./routes/resumeBuilder"));
app.use("/api/dashboard", require("./routes/dashboard"));

// ===============================
// Health Check
// ===============================
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "🚀 InterviewGen AI Backend Running",
  });
});

// ===============================
// MongoDB Connection
// ===============================
const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
  console.error("❌ MONGO_URI is missing in .env");
  process.exit(1);
}
console.log("MONGO_URI:", process.env.MONGO_URI);
mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("✅ MongoDB Connected Successfully");

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Failed");
    console.error(err);
    process.exit(1);
  });