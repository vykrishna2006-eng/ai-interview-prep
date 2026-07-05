import React, { useEffect, useState } from 'react'
import { useParams, useLocation, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell,
  PieChart, Pie, Legend
} from 'recharts'
import { FiDownload, FiMail, FiHome, FiRepeat } from 'react-icons/fi'
import Navbar from '../components/Navbar'
import api from '../utils/api'
import toast from 'react-hot-toast'

export default function Results() {
  const { testId } = useParams()
  const { state } = useLocation()
  const [result, setResult] = useState(state?.result || null)
  const [loading, setLoading] = useState(!state?.result)

  useEffect(() => {
    if (!result) {
      api.get(`/evaluate/result/${testId}`).then(r => {
        setResult(r.data.test)
        setLoading(false)
      }).catch(() => setLoading(false))
    }
  }, [testId])

  const handleDownloadPDF = () => {
    window.open(`/api/report/pdf/${testId}`, '_blank')
    toast.success('Downloading PDF report...')
  }

  if (loading) return (
    <div className="animated-bg min-h-screen flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-primary-500/30 border-t-primary-500 rounded-full animate-spin" />
    </div>
  )

  if (!result) return (
    <div className="animated-bg min-h-screen flex items-center justify-center">
      <div className="text-center"><p className="text-white/50">Result not found</p><Link to="/dashboard" className="btn-primary mt-4 inline-block">Go Home</Link></div>
    </div>
  )

  const sectionResults = result.sectionResults || []
  const overall = result.overallPercentage || 0
  const scoreColor = overall >= 70 ? '#10B981' : overall >= 50 ? '#F59E0B' : '#EF4444'

  const barData = sectionResults.map(s => ({ name: s.skill, score: s.percentage }))
  const radarData = sectionResults.map(s => ({ skill: s.skill.slice(0, 8), score: s.percentage }))
  const pieData = [
    { name: 'Correct', value: result.correct || 0, fill: '#10B981' },
    { name: 'Wrong', value: (result.totalQuestions || 0) - (result.correct || 0), fill: '#EF4444' }
  ]

  return (
    <div className="animated-bg min-h-screen">
      <Navbar />
      <div className="pt-20 pb-12 px-4 max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full text-sm text-primary-300 border border-primary-500/30 mb-4">
              🏁 Test Completed
            </div>
            <h1 className="text-4xl font-black mb-2">Your Results <span className="gradient-text">are Ready!</span></h1>
            <p className="text-white/50">Full report sent to your email with PDF attachment 📧</p>
          </div>

          {/* Overall Score */}
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 200 }}
            className="card text-center mb-8 glow">
            <p className="text-white/50 text-sm uppercase tracking-wider mb-2">Overall Score</p>
            <div className="text-7xl font-black mb-2" style={{ color: scoreColor }}>{overall}%</div>
            <div className="flex justify-center gap-8 text-sm text-white/50 mt-3">
              <span>✅ {result.correct} Correct</span>
              <span>❌ {(result.totalQuestions || 0) - (result.correct || 0)} Wrong</span>
              <span>📝 {result.totalQuestions} Total</span>
            </div>
          </motion.div>

          {/* Section Results */}
          <div className="card mb-6">
            <h2 className="text-xl font-bold mb-5">Section-wise Scores</h2>
            <div className="space-y-3">
              {sectionResults.map((s, i) => (
                <motion.div key={s.skill} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="font-semibold">{s.skill}</span>
                    <span className={s.percentage >= 70 ? 'text-emerald-400' : s.percentage >= 50 ? 'text-amber-400' : 'text-red-400'}>
                      {s.score}/{s.maxScore} — {s.percentage}%
                    </span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${s.percentage}%` }} transition={{ delay: i * 0.1 + 0.3, duration: 0.8 }}
                      className="h-full rounded-full progress-bar" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Bar chart */}
            <div className="card">
              <h3 className="font-bold mb-4">Score by Section</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="name" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 10 }} />
                  <YAxis domain={[0, 100]} tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 10 }} />
                  <Tooltip contentStyle={{ background: '#1a1a2e', border: '1px solid rgba(108,99,255,0.3)', borderRadius: '8px', color: '#fff' }} />
                  <Bar dataKey="score" radius={[4, 4, 0, 0]}>
                    {barData.map((entry, i) => (
                      <Cell key={i} fill={entry.score >= 70 ? '#10B981' : entry.score >= 50 ? '#F59E0B' : '#EF4444'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Pie chart */}
            <div className="card">
              <h3 className="font-bold mb-4">Correct vs Wrong</h3>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value">
                    {pieData.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
                  </Pie>
                  <Legend formatter={(v) => <span style={{ color: 'rgba(255,255,255,0.7)' }}>{v}</span>} />
                  <Tooltip contentStyle={{ background: '#1a1a2e', border: '1px solid rgba(108,99,255,0.3)', borderRadius: '8px', color: '#fff' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <button onClick={handleDownloadPDF} className="card hover:border-primary-500/40 transition-all flex flex-col items-center gap-2 py-4 cursor-pointer">
              <FiDownload size={20} className="text-primary-400" />
              <span className="text-sm font-medium">Download PDF</span>
            </button>
            <div className="card flex flex-col items-center gap-2 py-4">
              <FiMail size={20} className="text-emerald-400" />
              <span className="text-sm font-medium text-center">{result.emailSent ? 'Email Sent ✅' : 'Email Pending'}</span>
            </div>
            <Link to="/upload-resume" className="card hover:border-primary-500/40 transition-all flex flex-col items-center gap-2 py-4">
              <FiRepeat size={20} className="text-purple-400" />
              <span className="text-sm font-medium">New Test</span>
            </Link>
            <Link to="/dashboard" className="card hover:border-primary-500/40 transition-all flex flex-col items-center gap-2 py-4">
              <FiHome size={20} className="text-orange-400" />
              <span className="text-sm font-medium">Dashboard</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
