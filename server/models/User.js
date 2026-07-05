const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String },
  avatar: { type: String, default: '' },
  provider: { type: String, default: 'local' },
  googleId: { type: String },
  githubId: { type: String },
  linkedinId: { type: String },
  isVerified: { type: Boolean, default: false },
  college: { type: String, default: '' },
  skills: [{ type: String }],
  testsCompleted: { type: Number, default: 0 },
  averageScore: { type: Number, default: 0 },
  badges: [{ type: String }],
  streak: { type: Number, default: 0 },
  lastActive: { type: Date, default: Date.now }
}, { timestamps: true });

// Hash password before save
userSchema.pre('save', async function (next) {
  if (!this.isModified('password') || !this.password) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
