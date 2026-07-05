import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FiUser, FiMail, FiAward, FiEdit2 } from 'react-icons/fi'
import Navbar from '../components/Navbar'
import useAuthStore from '../store/authStore'
import toast from 'react-hot-toast'

export default function Profile() {
  const { user } = useAuthStore()
  const [editing, setEditing] = useState(false)

  return (
    <div className="animated-bg min-h-screen">
      <Navbar />
      <div className="pt-20 pb-12 px-4 max-w-2xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-black mb-8">Your <span className="gradient-text">Profile</span></h1>

          <div className="card text-center mb-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary-500 to-purple-500 flex items-center justify-center text-3xl font-black mx-auto mb-4">
              {user?.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
              ) : (
                user?.name?.[0]?.toUpperCase()
              )}
            </div>
            <h2 className="text-2xl font-black">{user?.name}</h2>
            <p className="text-white/50">{user?.email}</p>
            <span className="badge bg-primary-500/20 text-primary-300 border border-primary-500/30 mt-2">
              {user?.provider === 'local' ? '📧 Email Login' : `🔗 ${user?.provider} Login`}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            {[
              { label: 'Tests', value: user?.testsCompleted || 0, icon: '📝' },
              { label: 'Avg Score', value: `${user?.averageScore || 0}%`, icon: '📊' },
              { label: 'Badges', value: user?.badges?.length || 0, icon: '🏅' }
            ].map(item => (
              <div key={item.label} className="card text-center">
                <div className="text-2xl mb-1">{item.icon}</div>
                <div className="text-xl font-black gradient-text">{item.value}</div>
                <div className="text-white/40 text-xs">{item.label}</div>
              </div>
            ))}
          </div>

          {user?.badges?.length > 0 && (
            <div className="card">
              <h3 className="font-bold mb-3 flex items-center gap-2"><FiAward className="text-yellow-400" /> Badges</h3>
              <div className="flex flex-wrap gap-2">
                {user.badges.map(b => (
                  <span key={b} className="badge bg-yellow-500/20 text-yellow-300 border border-yellow-500/30">🏅 {b}</span>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
