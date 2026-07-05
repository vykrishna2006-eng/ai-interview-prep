import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiUpload, FiFileText, FiClock, FiAward, FiTrendingUp, FiZap, FiBriefcase } from 'react-icons/fi'
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, Tooltip } from 'recharts'
import Navbar from '../components/Navbar'
import useAuthStore from '../store/authStore'
import api from '../utils/api'

export default function Dashboard() {
  const { user } = useAuthStore()
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/dashboard/stats').then(r => {
      setStats(r.data.stats)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  const cards = [
    { label: 'Tests Completed', value: stats?.testsCompleted || 0, icon: <FiZap />, color: 'from-purple-500 to-primary-500' },
    { label: 'Average Score', value: `${stats?.averageScore || 0}%`, icon: <FiTrendingUp />, color: 'from-emerald-500 to-teal-500' },
    { label: 'Resume Score', value: `${stats?.resumeScore || 0}%`, icon: <FiFileText />, color: 'from-orange-500 to-amber-500' },
    { label: 'Badges Earned', value: stats?.badges?.length || 0, icon: <FiAward />, color: 'from-pink-500 to-rose-500' }
  ]

  const radarData = stats?.skillPerformance?.map(s => ({
    skill: s.skill.length > 10 ? s.skill.slice(0, 10) : s.skill,
    score: s.avgScore
  })) || []

  return (
    <div className="animated-bg min-h-screen">
      <Navbar />
      <div className="pt-20 pb-12 px-4 max-w-7xl mx-auto">

        {/* Greeting */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl font-black mb-1">
            Hello, <span className="gradient-text">{user?.name?.split(' ')[0]} 👋</span>
          </h1>
          <p className="text-white/50">Ready to crush your next interview?</p>
        </motion.div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {cards.map((card, i) => (
            <motion.div key={card.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className="card hover:scale-105 transition-transform duration-200">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center text-white mb-3`}>
                {card.icon}
              </div>
              <div className="text-2xl font-black text-white">{loading ? '—' : card.value}</div>
              <div className="text-white/50 text-sm">{card.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="card">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><FiZap className="text-primary-400" /> Quick Actions</h2>
            <div className="space-y-3">
              <Link to="/upload-resume" className="flex items-center gap-3 p-3 rounded-xl glass border border-white/10 hover:border-primary-500/40 hover:bg-primary-500/10 transition-all group">
                <div className="w-10 h-10 rounded-lg bg-primary-500/20 flex items-center justify-center text-primary-400 group-hover:bg-primary-500/30 transition-colors">
                  <FiUpload size={18} />
                </div>
                <div>
                  <div className="font-semibold text-sm">Upload Resume</div>
                  <div className="text-white/40 text-xs">Start a new test</div>
                </div>
              </Link>
              <Link to="/resume-builder" className="flex items-center gap-3 p-3 rounded-xl glass border border-white/10 hover:border-emerald-500/40 hover:bg-emerald-500/10 transition-all group">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500/30 transition-colors">
                  <FiFileText size={18} />
                </div>
                <div>
                  <div className="font-semibold text-sm">Create Resume</div>
                  <div className="text-white/40 text-xs">AI-powered builder</div>
                </div>
              </Link>
              <Link to="/company-prep" className="flex items-center gap-3 p-3 rounded-xl glass border border-white/10 hover:border-orange-500/40 hover:bg-orange-500/10 transition-all group">
                <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center text-orange-400 group-hover:bg-orange-500/30 transition-colors">
                  <FiBriefcase size={18} />
                </div>
                <div>
                  <div className="font-semibold text-sm">Company Prep</div>
                  <div className="text-white/40 text-xs">Google, Amazon & more</div>
                </div>
              </Link>
              <Link to="/history" className="flex items-center gap-3 p-3 rounded-xl glass border border-white/10 hover:border-purple-500/40 hover:bg-purple-500/10 transition-all group">
                <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400 group-hover:bg-purple-500/30 transition-colors">
                  <FiClock size={18} />
                </div>
                <div>
                  <div className="font-semibold text-sm">Previous Tests</div>
                  <div className="text-white/40 text-xs">View history</div>
                </div>
              </Link>
            </div>
          </motion.div>

          {/* Skill Performance Radar */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card lg:col-span-2">
            <h2 className="text-lg font-bold mb-4">Skill Performance</h2>
            {radarData.length > 0 ? (
              <ResponsiveContainer width="100%" height={250}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="rgba(255,255,255,0.1)" />
                  <PolarAngleAxis dataKey="skill" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 11 }} />
                  <Radar name="Score" dataKey="score" stroke="#6C63FF" fill="#6C63FF" fillOpacity={0.25} />
                  <Tooltip contentStyle={{ background: '#1a1a2e', border: '1px solid rgba(108,99,255,0.3)', borderRadius: '8px', color: '#fff' }} />
                </RadarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-48 flex flex-col items-center justify-center text-white/30">
                <FiTrendingUp size={32} className="mb-3 opacity-30" />
                <p className="text-sm">Complete a test to see your skill performance</p>
                <Link to="/upload-resume" className="mt-3 text-primary-400 text-sm hover:underline">Upload Resume →</Link>
              </div>
            )}
          </motion.div>
        </div>

        {/* Skills from resume */}
        {stats?.skills?.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="card mt-6">
            <h2 className="text-lg font-bold mb-4">Skills from Your Resume</h2>
            <div className="flex flex-wrap gap-2">
              {stats.skills.map(skill => (
                <span key={skill} className="badge bg-primary-500/20 text-primary-300 border border-primary-500/30">{skill}</span>
              ))}
            </div>
          </motion.div>
        )}

        {/* Badges */}
        {stats?.badges?.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="card mt-6">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><FiAward className="text-yellow-400" /> Badges</h2>
            <div className="flex flex-wrap gap-3">
              {stats.badges.map(badge => (
                <span key={badge} className="badge bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 px-4 py-2 text-sm">🏅 {badge}</span>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
