import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FiEye, FiEyeOff, FiUser, FiMail, FiLock, FiCheck, FiX } from 'react-icons/fi'
import { SiGoogle, SiGithub, SiLinkedin } from 'react-icons/si'
import useAuthStore from '../store/authStore'

const PasswordRule = ({ met, label }) => (
  <div className={`flex items-center gap-1.5 text-xs ${met ? 'text-green-400' : 'text-white/40'}`}>
    {met ? <FiCheck size={11} /> : <FiX size={11} />} {label}
  </div>
)

export default function Register() {
  const { register: registerUser, isLoading } = useAuthStore()
  const navigate = useNavigate()
  const [showPwd, setShowPwd] = useState(false)
  const [pwd, setPwd] = useState('')

  const { register, handleSubmit, formState: { errors }, watch } = useForm()

  const rules = {
    minLen: pwd.length >= 8,
    upper: /[A-Z]/.test(pwd),
    lower: /[a-z]/.test(pwd),
    number: /\d/.test(pwd),
    special: /[@$!%*?&]/.test(pwd)
  }

  const onSubmit = async (data) => {
    const res = await registerUser(data.name, data.email, data.password)
    if (res.success) {
      toast.success('Account created! Let\'s get you interview-ready 🚀')
      navigate('/dashboard')
    } else {
      toast.error(res.message)
    }
  }

  const handleOAuth = (provider) => { window.location.href = `/api/auth/${provider}` }

  return (
    <div className="animated-bg min-h-screen flex items-center justify-center px-4 py-8">
      <div className="absolute top-20 left-1/3 w-72 h-72 bg-primary-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-1/3 w-64 h-64 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-purple-500 flex items-center justify-center font-black text-sm">IG</div>
            <span className="text-xl font-bold">InterviewGen <span className="gradient-text">AI</span></span>
          </Link>
          <h1 className="text-3xl font-black mb-2">Create Your Account</h1>
          <p className="text-white/50">Start your interview prep journey for free</p>
        </div>

        <div className="card glow-sm">
          {/* OAuth */}
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
            <span className="text-white/30 text-sm">or sign up with email</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="text-sm text-white/60 mb-1.5 flex items-center gap-2"><FiUser size={14} /> Full Name</label>
              <input {...register('name', { required: 'Name is required', minLength: { value: 2, message: 'At least 2 characters' } })}
                type="text" placeholder="Yaswanth Kumar" className="input-field" />
              {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
            </div>

            <div>
              <label className="text-sm text-white/60 mb-1.5 flex items-center gap-2"><FiMail size={14} /> Email</label>
              <input {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+\.\S+$/, message: 'Invalid email' } })}
                type="email" placeholder="you@email.com" className="input-field" />
              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label className="text-sm text-white/60 mb-1.5 flex items-center gap-2"><FiLock size={14} /> Password</label>
              <div className="relative">
                <input {...register('password', {
                  required: 'Password is required',
                  pattern: { value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/, message: 'Password does not meet requirements' }
                })}
                  type={showPwd ? 'text' : 'password'} placeholder="••••••••" className="input-field pr-12"
                  onChange={e => setPwd(e.target.value)} />
                <button type="button" onClick={() => setShowPwd(!showPwd)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white">
                  {showPwd ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
              </div>
              {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}

              {/* Password rules */}
              {pwd.length > 0 && (
                <div className="mt-2 p-3 rounded-lg bg-white/5 grid grid-cols-2 gap-1">
                  <PasswordRule met={rules.minLen} label="8+ characters" />
                  <PasswordRule met={rules.upper} label="Uppercase letter" />
                  <PasswordRule met={rules.lower} label="Lowercase letter" />
                  <PasswordRule met={rules.number} label="Number" />
                  <PasswordRule met={rules.special} label="Special character (@$!%*?&)" />
                </div>
              )}
            </div>

            <button type="submit" disabled={isLoading} className="btn-primary w-full justify-center flex items-center gap-2 mt-2">
              {isLoading ? (
                <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Creating account...</>
              ) : 'Create Account →'}
            </button>
          </form>
        </div>

        <p className="text-center text-white/50 text-sm mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-primary-400 hover:text-primary-300 font-semibold">Sign in →</Link>
        </p>
      </motion.div>
    </div>
  )
}
