import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiBriefcase, FiSearch, FiTrendingUp, FiExternalLink } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import companies from '../data/companies'

const difficultyColor = (d = '') => {
  if (d.toLowerCase().includes('very hard')) return 'bg-red-500/20 text-red-400'
  if (d.toLowerCase().includes('hard')) return 'bg-orange-500/20 text-orange-400'
  if (d.toLowerCase().includes('medium')) return 'bg-yellow-500/20 text-yellow-400'
  return 'bg-emerald-500/20 text-emerald-400'
}

export default function CompanyPrep() {
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  const { filtered, hasExact, googleQuery } = useMemo(() => {
    const q = search.trim()
    if (!q) return { filtered: companies, hasExact: false, googleQuery: '' }

    const results = companies.filter(c =>
      c.name.toLowerCase().includes(q.toLowerCase())
    )
    return {
      filtered: results,
      hasExact: results.length > 0,
      googleQuery: q
    }
  }, [search])

  const handleCompanyClick = (company) => {
    if (company.isExtra) {
      // Extra companies → open Google search in new tab
      const url = `https://www.google.com/search?q=${encodeURIComponent(company.name + ' Software Engineer Interview Questions 2026')}`
      window.open(url, '_blank')
    } else {
      navigate(`/company/${encodeURIComponent(company.name)}`)
    }
  }

  return (
    <div className="animated-bg min-h-screen">
      <Navbar />
      <div className="pt-20 pb-12 px-4 max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-black mb-1">Company <span className="gradient-text">Preparation</span></h1>
          <p className="text-white/50 mb-6">
            Search any company — 100+ supported. Click for full guide or live Google results.
          </p>

          {/* Search Bar */}
          <div className="relative mb-8">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={18} />
            <input
              type="text"
              placeholder="Search any company... (Google, Wipro, Stripe, Dream11...)"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-white
                placeholder-white/30 focus:outline-none focus:border-primary-500/50 transition text-sm"
            />
            {search && (
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 text-xs">
                {filtered.length} result{filtered.length !== 1 ? 's' : ''}
              </span>
            )}
          </div>

          {/* No match → Google search card */}
          <AnimatePresence>
            {search.trim() && !hasExact && (
              <motion.div
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="mb-6"
              >
                <p className="text-white/40 text-sm mb-3">
                  No local guide for <span className="text-white/70">"{search}"</span> — find it on Google:
                </p>
                <a
                  href={`https://www.google.com/search?q=${encodeURIComponent(search + ' Software Engineer Interview Questions 2026')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card flex items-center gap-4 hover:border-primary-500/50 transition cursor-pointer group w-fit"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-red-500 flex items-center justify-center text-2xl">
                    🔍
                  </div>
                  <div>
                    <p className="font-bold group-hover:text-primary-300 transition">
                      Search "{search}" on Google
                    </p>
                    <p className="text-white/40 text-xs mt-0.5">
                      {search} Software Engineer Interview Questions 2026
                    </p>
                  </div>
                  <FiExternalLink className="ml-4 text-white/30 group-hover:text-primary-400 transition" size={16} />
                </a>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Company Grid */}
          {filtered.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((company, i) => (
                <motion.div
                  key={company.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(i * 0.025, 0.5) }}
                  onClick={() => handleCompanyClick(company)}
                  className="card cursor-pointer hover:scale-[1.02] hover:border-white/20 transition-all duration-200 group"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${company.color} flex items-center justify-center text-2xl shadow-md`}>
                      {company.logo}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-base group-hover:text-primary-300 transition truncate">
                          {company.name}
                        </h3>
                        {company.isExtra && (
                          <FiExternalLink size={12} className="text-white/30 shrink-0" />
                        )}
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${difficultyColor(company.difficulty)}`}>
                        {company.difficulty}
                      </span>
                    </div>
                  </div>

                  {!company.isExtra && (
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {(company.importantTopics?.DSA || company.selectionProcess?.[0]?.topics || []).slice(0, 4).map(t => (
                        <span key={t} className="badge bg-white/5 text-white/50 border border-white/10 text-xs">{t}</span>
                      ))}
                      {((company.importantTopics?.DSA || []).length > 4) && (
                        <span className="badge bg-white/5 text-white/30 border border-white/10 text-xs">+more</span>
                      )}
                    </div>
                  )}

                  {company.isExtra && (
                    <p className="text-xs text-white/30 mb-3">Click to view on Google →</p>
                  )}

                  <div className="flex items-center justify-between text-xs text-white/40">
                    <span className="flex items-center gap-1">
                      <FiBriefcase size={11} /> {company.rounds} rounds
                    </span>
                    {company.avgSalary ? (
                      <span className="flex items-center gap-1 text-yellow-500/70">
                        <FiTrendingUp size={11} /> {company.avgSalary.junior}
                      </span>
                    ) : (
                      <span className="text-white/20 text-xs">View on Google</span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
