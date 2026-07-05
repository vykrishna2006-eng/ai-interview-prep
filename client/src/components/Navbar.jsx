import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiHome, FiUpload, FiFileText, FiClock, FiUser, FiLogOut, FiBriefcase, FiMenu, FiX } from 'react-icons/fi'
import useAuthStore from '../store/authStore'
import toast from 'react-hot-toast'

const navLinks = [
  { to: '/dashboard', icon: <FiHome size={16} />, label: 'Dashboard' },
  { to: '/upload-resume', icon: <FiUpload size={16} />, label: 'Upload Resume' },
  { to: '/resume-builder', icon: <FiFileText size={16} />, label: 'Resume Builder' },
  { to: '/company-prep', icon: <FiBriefcase size={16} />, label: 'Company Prep' },
  { to: '/history', icon: <FiClock size={16} />, label: 'History' },
  { to: '/profile', icon: <FiUser size={16} />, label: 'Profile' }
]

export default function Navbar() {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleLogout = () => {
    logout()
    toast.success('Logged out')
    navigate('/login')
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-purple-500 flex items-center justify-center font-black text-xs">IG</div>
          <span className="font-bold hidden sm:block">InterviewGen <span className="gradient-text">AI</span></span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(link => (
            <Link key={link.to} to={link.to}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                ${location.pathname === link.to
                  ? 'bg-primary-500/20 text-primary-400'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}>
              {link.icon} {link.label}
            </Link>
          ))}
        </div>

        {/* User + logout */}
        <div className="flex items-center gap-3">
          {user && (
            <div className="hidden sm:flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-purple-500 flex items-center justify-center text-xs font-bold">
                {user.name?.[0]?.toUpperCase()}
              </div>
              <span className="text-sm text-white/70 hidden lg:block">{user.name}</span>
            </div>
          )}
          <button onClick={handleLogout} className="text-white/40 hover:text-red-400 transition-colors p-2 rounded-lg hover:bg-red-500/10">
            <FiLogOut size={16} />
          </button>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-white/60 p-2">
            {mobileOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="md:hidden glass border-t border-white/10 py-2">
            {navLinks.map(link => (
              <Link key={link.to} to={link.to} onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-5 py-3 text-sm font-medium transition-colors
                  ${location.pathname === link.to ? 'text-primary-400 bg-primary-500/10' : 'text-white/60 hover:text-white'}`}>
                {link.icon} {link.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
