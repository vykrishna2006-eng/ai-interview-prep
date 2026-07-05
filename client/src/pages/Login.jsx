import React, { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FiEye, FiEyeOff, FiMail, FiLock } from 'react-icons/fi'
import { SiGoogle, SiGithub, SiLinkedin } from 'react-icons/si'
import useAuthStore from '../store/authStore'

export default function Login() {
  const { login, isLoading } = useAuthStore()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [showPwd, setShowPwd] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = async (data) => {
    const res = await login(data.email, data.password)
    if (res.success) {
      toast.success('Welcome back! 👋')
      navigate('/dashboard')
    } else {
      toast.error(res.message)
    }
  }

  const handleOAuth = (provider) => {
    window.location.href = `/api/auth/${provider}`
  }

  const oauthError = searchParams.get('error')

  return (
    <div className="animated-bg min-h-screen flex items-center justify-center px-4">
      <div className="absolute top-20 left-1/3 w-72 h-72 bg-primary-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-1/3 w-64 h-64 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-purple-500 flex items-center justify-center font-black text-sm">IG</div>
            <span className="text-xl font-bold">InterviewGen <span className="gradient-text">AI</span></span>
          </Link>
          <h1 className="text-3xl font-black mb-2">Welcome Back 👋</h1>
          <p className="text-white/50">Sign in to continue your preparation</p>
        </div>

        {oauthError && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm text-center">
            OAuth login failed. Please try again.
          </div>
        )}

        <div className="card glow-sm">
          {/* OAuth Buttons */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {[
              { provider: 'google', icon: <SiGoogle size={18} />, label: 'Google', color: 'hover:border-red-500/50' },
              { provider: 'github', icon: <SiGithub size={18} />, label: 'GitHub', color: 'hover:border-white/50' },
              { provider: 'linkedin', icon: <SiLinkedin size={18} />, label: 'LinkedIn', color: 'hover:border-blue-500/50' }
            ].map(({ provider, icon, label, color }) => (
              <button key={provider} onClick={() => handleOAuth(provider)}
                className={`flex flex-col items-center gap-1.5 p-3 rounded-xl glass border border-white/10 ${color} transition-all duration-200 hover:scale-105 text-white/70 hover:text-white`}>
                {icon}
                <span className="text-xs font-medium">{label}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-white/30 text-sm">or sign in with email</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="text-sm text-white/60 mb-1.5 flex items-center gap-2"><FiMail size={14} /> Email</label>
              <input {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+\.\S+$/, message: 'Invalid email' } })}
                type="email" placeholder="you@email.com" className="input-field" />
              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label className="text-sm text-white/60 mb-1.5 flex items-center gap-2"><FiLock size={14} /> Password</label>
              <div className="relative">
                <input {...register('password', { required: 'Password is required' })}
                  type={showPwd ? 'text' : 'password'} placeholder="••••••••" className="input-field pr-12" />
                <button type="button" onClick={() => setShowPwd(!showPwd)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white">
                  {showPwd ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
              </div>
              {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
            </div>

            <button type="submit" disabled={isLoading} className="btn-primary w-full justify-center flex items-center gap-2 mt-2">
              {isLoading ? (
                <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Signing in...</>
              ) : 'Sign In →'}
            </button>
          </form>
        </div>

        <p className="text-center text-white/50 text-sm mt-6">
          Don't have an account?{' '}
          <Link to="/register" className="text-primary-400 hover:text-primary-300 font-semibold">Create one free →</Link>
        </p>
      </motion.div>
    </div>
  )
}
