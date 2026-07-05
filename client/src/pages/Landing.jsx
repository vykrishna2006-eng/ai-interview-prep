import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiBriefcase, FiUpload, FiCpu, FiMic, FiMail, FiAward } from 'react-icons/fi'
import { SiGoogle, SiGithub, SiLinkedin } from 'react-icons/si'

const features = [
  { icon: <FiUpload size={28} />, title: 'Resume Parser', desc: 'AI extracts your skills, projects, and experience automatically from PDF/DOCX.' },
  { icon: <FiCpu size={28} />, title: 'AI Question Generator', desc: 'Get real interview questions from top companies based on your exact skill set.' },
  { icon: <FiMic size={28} />, title: 'Voice Answers', desc: 'Speak your answers — Web Speech API transcribes them instantly.' },
  { icon: <FiBriefcase size={28} />, title: 'AI Evaluation', desc: 'Every answer is evaluated for concept, accuracy, completeness, and examples.' },
  { icon: <FiMail size={28} />, title: 'Email + PDF Report', desc: 'Full test report with scores, feedback, and ideal answers sent to your email.' },
  { icon: <FiAward size={28} />, title: 'Resume Builder', desc: 'AI builds an ATS-friendly resume — export to Word Doc or Overleaf LaTeX.' }
]

const companies = ['Google', 'Amazon', 'Microsoft', 'Meta', 'Adobe', 'Oracle', 'Goldman Sachs', 'JP Morgan', 'Infosys', 'TCS', 'Flipkart', 'Accenture']

export default function Landing() {
  return (
    <div className="animated-bg min-h-screen text-white overflow-hidden">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-purple-500 flex items-center justify-center text-sm font-black">IG</div>
            <span className="font-bold text-lg">InterviewGen <span className="gradient-text">AI</span></span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login" className="text-white/70 hover:text-white px-4 py-2 rounded-lg transition-colors">Sign In</Link>
            <Link to="/register" className="btn-primary py-2 px-5 text-sm">Get Started Free</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-24 px-6 max-w-7xl mx-auto text-center">
        {/* Glow blobs */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-40 right-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-primary-300 border border-primary-500/30 mb-6">
            🚀 AI-Powered Interview Preparation
          </span>
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
            Ace Your Next<br />
            <span className="gradient-text">Dream Job Interview</span>
          </h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
            Upload your resume → AI extracts skills → Get real interview questions from Google, Amazon & 100+ companies → Answer by typing or voice → Get scored instantly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="btn-primary text-lg px-8 py-4 glow">
              Start Free Preparation →
            </Link>
            <Link to="/login" className="btn-outline text-lg px-8 py-4">
              Sign In
            </Link>
          </div>
        </motion.div>

        {/* OAuth badges */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mt-10 flex items-center justify-center gap-6 text-white/40 text-sm">
          <span>Login with</span>
          <div className="flex gap-4">
            <SiGoogle size={20} className="text-white/50 hover:text-white transition-colors" />
            <SiGithub size={20} className="text-white/50 hover:text-white transition-colors" />
            <SiLinkedin size={20} className="text-white/50 hover:text-white transition-colors" />
          </div>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="py-12 px-6 border-y border-white/5">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[['10,000+', 'Questions'], ['50+', 'Skills Covered'], ['100+', 'Companies'], ['95%', 'Success Rate']].map(([num, label]) => (
            <motion.div key={label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="text-3xl font-black gradient-text">{num}</div>
              <div className="text-white/50 text-sm mt-1">{label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black mb-4">Everything You Need to <span className="gradient-text">Crack Interviews</span></h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">From resume parsing to AI evaluation — a complete end-to-end interview preparation platform.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="card hover:border-primary-500/40 transition-all duration-300 group hover:glow-sm">
              <div className="w-12 h-12 rounded-xl bg-primary-500/20 flex items-center justify-center text-primary-400 mb-4 group-hover:bg-primary-500/30 transition-colors">
                {f.icon}
              </div>
              <h3 className="text-lg font-bold mb-2">{f.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Companies */}
      <section className="py-16 px-6 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-white/40 text-sm mb-8 uppercase tracking-widest">Questions from top companies</p>
          <div className="flex flex-wrap justify-center gap-4">
            {companies.map(c => (
              <span key={c} className="px-4 py-2 glass rounded-full text-sm text-white/60 border border-white/10 hover:border-primary-500/40 hover:text-white transition-all cursor-default">{c}</span>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 px-6 max-w-5xl mx-auto">
        <h2 className="text-4xl font-black text-center mb-16">How It <span className="gradient-text">Works</span></h2>
        <div className="space-y-6">
          {[
            ['01', 'Sign Up & Login', 'Create your account in seconds using email or OAuth (Google/GitHub/LinkedIn).'],
            ['02', 'Upload Your Resume', 'Drop your PDF/DOCX resume. AI extracts all skills, projects, and experience.'],
            ['03', 'Generate Interview Questions', 'Get section-wise questions for each of your skills — sourced from real company interviews.'],
            ['04', 'Answer by Typing or Voice', 'Type your answers or click the mic to speak. AI evaluates concept accuracy in real time.'],
            ['05', 'Submit & Get Results', 'Submit each section for immediate scores. Final SUBMIT TEST sends your full PDF report to email.']
          ].map(([num, title, desc]) => (
            <motion.div key={num} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="flex gap-6 items-start card hover:border-primary-500/30 transition-all">
              <div className="text-5xl font-black gradient-text opacity-40 leading-none">{num}</div>
              <div>
                <h3 className="text-lg font-bold mb-1">{title}</h3>
                <p className="text-white/50 text-sm">{desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 text-center">
        <div className="max-w-2xl mx-auto card glow">
          <h2 className="text-4xl font-black mb-4">Ready to <span className="gradient-text">Get Hired?</span></h2>
          <p className="text-white/50 mb-8">Join thousands of developers who cracked their dream job with InterviewGen AI.</p>
          <Link to="/register" className="btn-primary text-lg px-10 py-4 glow">Start Preparing Now — It's Free</Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 px-6 text-center text-white/30 text-sm">
        <p>© 2026 InterviewGen AI. Built with ❤️ for developers who aim for the top.</p>
      </footer>
    </div>
  )
}
