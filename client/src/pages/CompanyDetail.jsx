import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FiArrowLeft, FiExternalLink, FiCheckCircle, FiBook,
  FiTrendingUp, FiUsers, FiCode, FiAward, FiClock, FiZap
} from 'react-icons/fi'
import Navbar from '../components/Navbar'
import { detailedCompanies as companies } from '../data/companies'

const difficultyColor = (d = '') => {
  if (d.toLowerCase().includes('very hard')) return 'bg-red-500/20 text-red-400 border-red-500/30'
  if (d.toLowerCase().includes('hard')) return 'bg-orange-500/20 text-orange-400 border-orange-500/30'
  if (d.toLowerCase().includes('medium')) return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
  return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
}

export default function CompanyDetail() {
  const { name } = useParams()
  const navigate = useNavigate()
  const company = companies.find(c => c.name.toLowerCase() === decodeURIComponent(name).toLowerCase())

  if (!company) {
    return (
      <div className="animated-bg min-h-screen flex items-center justify-center">
        <Navbar />
        <div className="text-center">
          <p className="text-white/50 text-xl mb-4">Company not found.</p>
          <button onClick={() => navigate('/company-prep')} className="btn-primary">← Back</button>
        </div>
      </div>
    )
  }

  const searchUrl = company.syllabus ||
    `https://www.google.com/search?q=${encodeURIComponent(company.name + ' Software Engineer Interview Questions 2026')}`

  return (
    <div className="animated-bg min-h-screen">
      <Navbar />
      <div className="pt-20 pb-16 px-4 max-w-6xl mx-auto">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/company-prep')}
          className="flex items-center gap-2 text-white/50 hover:text-white transition mb-6 text-sm"
        >
          <FiArrowLeft /> Back to Companies
        </motion.button>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card mb-6">
          <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
            <div className="flex items-center gap-4">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${company.color} flex items-center justify-center text-3xl shadow-lg`}>
                {company.logo}
              </div>
              <div>
                <h1 className="text-3xl font-black">{company.name} <span className="gradient-text">Interview Prep</span></h1>
                <div className="flex flex-wrap items-center gap-2 mt-1">
                  <span className={`text-xs px-2 py-0.5 rounded-full border ${difficultyColor(company.difficulty)}`}>{company.difficulty}</span>
                  <span className="text-white/40 text-sm">{company.rounds} Interview Rounds</span>
                </div>
              </div>
            </div>
            <a href={searchUrl} target="_blank" rel="noopener noreferrer"
              className="btn-primary flex items-center gap-2 text-sm w-fit">
              <FiExternalLink size={14} /> More Information
            </a>
          </div>
          <p className="mt-4 text-white/60 text-sm leading-relaxed">{company.about}</p>
        </motion.div>

        {/* Salary */}
        {company.avgSalary && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
            className="card mb-6">
            <div className="flex items-center gap-2 mb-4">
              <FiAward className="text-yellow-400" size={18} />
              <h2 className="font-bold text-lg">Salary Range (India)</h2>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[['Junior / Fresher', company.avgSalary.junior], ['Mid Level', company.avgSalary.mid], ['Senior Level', company.avgSalary.senior]].map(([level, salary]) => (
                <div key={level} className="glass rounded-xl p-3 text-center">
                  <p className="text-white/40 text-xs mb-1">{level}</p>
                  <p className="text-yellow-400 font-bold text-sm">{salary}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Selection Process */}
        {company.selectionProcess?.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card mb-6">
            <div className="flex items-center gap-2 mb-4">
              <FiUsers className="text-primary-400" size={18} />
              <h2 className="font-bold text-lg">Selection Process</h2>
            </div>
            <div className="space-y-3">
              {company.selectionProcess.map((round) => (
                <div key={round.round} className="glass rounded-xl p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded-full bg-primary-500/20 text-primary-400 flex items-center justify-center text-xs font-bold border border-primary-500/30">
                        {round.round}
                      </span>
                      <span className="font-semibold text-sm">{round.title}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      {round.duration && (
                        <span className="flex items-center gap-1 text-white/40"><FiClock size={11} /> {round.duration}</span>
                      )}
                      <span className={`px-2 py-0.5 rounded-full border ${difficultyColor(round.difficulty)}`}>{round.difficulty}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {round.topics.map(t => (
                      <span key={t} className="text-xs px-2 py-0.5 rounded-md bg-white/5 text-white/60 border border-white/10">{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Important Topics */}
        {company.importantTopics && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="card mb-6">
            <div className="flex items-center gap-2 mb-4">
              <FiCode className="text-emerald-400" size={18} />
              <h2 className="font-bold text-lg">Important Topics</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.entries(company.importantTopics).map(([category, topics]) => (
                topics.length > 0 && (
                  <div key={category} className="glass rounded-xl p-4">
                    <p className="text-xs font-semibold text-primary-400 uppercase tracking-wider mb-3">{category}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {topics.map(t => (
                        <span key={t} className="text-xs px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">{t}</span>
                      ))}
                    </div>
                  </div>
                )
              ))}
            </div>
          </motion.div>
        )}

        {/* Preparation Roadmap */}
        {company.roadmap?.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card mb-6">
            <div className="flex items-center gap-2 mb-4">
              <FiTrendingUp className="text-purple-400" size={18} />
              <h2 className="font-bold text-lg">Preparation Roadmap</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {company.roadmap.map((item) => (
                <div key={item.week} className="glass rounded-xl p-4">
                  <div className="flex items-center gap-1 mb-2">
                    <span className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center text-xs font-bold border border-purple-500/30">
                      {item.week}
                    </span>
                    <span className="text-xs text-white/50">Week {item.week}</span>
                  </div>
                  <div className="space-y-1">
                    {item.topics.map(t => (
                      <p key={t} className="text-xs text-white/70 flex items-center gap-1.5">
                        <span className="text-purple-400 text-[10px]">▸</span>{t}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* FAQs + Tips side by side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {company.faqs?.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="card">
              <div className="flex items-center gap-2 mb-4">
                <FiBook className="text-cyan-400" size={18} />
                <h2 className="font-bold text-lg">Frequently Asked Questions</h2>
              </div>
              <ul className="space-y-2">
                {company.faqs.map((q, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-white/70">
                    <span className="text-cyan-400 font-bold mt-0.5 shrink-0">Q{i + 1}.</span>
                    {q}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}

          {company.tips?.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="card">
              <div className="flex items-center gap-2 mb-4">
                <FiZap className="text-yellow-400" size={18} />
                <h2 className="font-bold text-lg">Preparation Tips</h2>
              </div>
              <ul className="space-y-2">
                {company.tips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-white/70">
                    <FiCheckCircle className="text-emerald-400 mt-0.5 shrink-0" size={14} />
                    {tip}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </div>

        {/* Resources */}
        {company.resources?.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="card mb-6">
            <div className="flex items-center gap-2 mb-4">
              <FiExternalLink className="text-indigo-400" size={18} />
              <h2 className="font-bold text-lg">Resources</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {company.resources.map((r) => (
                <a key={r.name} href={r.url} target="_blank" rel="noopener noreferrer"
                  className="btn-outline text-sm py-2 px-4 flex items-center gap-2">
                  <FiExternalLink size={13} /> {r.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}

        {/* More Information CTA */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="card border-primary-500/40 text-center">
          <p className="text-white/60 text-sm mb-3">Want the full {company.name} interview syllabus and latest questions?</p>
          <a href={searchUrl} target="_blank" rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-2">
            <FiExternalLink size={15} /> Open {company.name} Interview Syllabus
          </a>
        </motion.div>
      </div>
    </div>
  )
}
