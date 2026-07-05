import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiCalendar, FiTrendingUp, FiEye } from 'react-icons/fi'
import Navbar from '../components/Navbar'
import api from '../utils/api'

export default function History() {
  const [tests, setTests] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/evaluate/history').then(r => {
      setTests(r.data.tests || [])
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  return (
    <div className="animated-bg min-h-screen">
      <Navbar />
      <div className="pt-20 pb-12 px-4 max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-black mb-2">Interview <span className="gradient-text">History</span></h1>
          <p className="text-white/50 mb-8">All your past tests with scores and feedback</p>

          {loading ? (
            <div className="flex justify-center py-20"><div className="w-10 h-10 border-4 border-primary-500/30 border-t-primary-500 rounded-full animate-spin" /></div>
          ) : tests.length === 0 ? (
            <div className="card text-center py-16">
              <div className="text-4xl mb-4">📋</div>
              <p className="text-white/50 mb-4">No tests completed yet</p>
              <Link to="/upload-resume" className="btn-primary inline-block">Take Your First Test →</Link>
            </div>
          ) : (
            <div className="space-y-4">
              {tests.map((test, i) => (
                <motion.div key={test._id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                  className="card hover:border-white/20 transition-all">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 text-white/40 text-xs mb-1">
                        <FiCalendar size={12} />
                        {new Date(test.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </div>
                      <div className="text-lg font-bold">
                        Overall: <span className={test.overallPercentage >= 70 ? 'text-emerald-400' : test.overallPercentage >= 50 ? 'text-amber-400' : 'text-red-400'}>
                          {test.overallPercentage}%
                        </span>
                      </div>
                    </div>
                    <Link to={`/results/${test._id}`} className="btn-outline text-xs py-1.5 px-4 flex items-center gap-1">
                      <FiEye size={12} /> View
                    </Link>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(test.sectionResults || []).map(s => (
                      <span key={s.skill} className={`badge text-xs border
                        ${s.percentage >= 70 ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' :
                          s.percentage >= 50 ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' :
                          'bg-red-500/20 text-red-400 border-red-500/30'}`}>
                        {s.skill}: {s.percentage}%
                      </span>
                    ))}
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
