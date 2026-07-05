import React, { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import useAuthStore from '../store/authStore'
import toast from 'react-hot-toast'

export default function OAuthCallback() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { fetchUser, setToken } = useAuthStore()

  useEffect(() => {
    const token = searchParams.get('token')
    if (token) {
      setToken(token)
      fetchUser().then(() => {
        toast.success('Logged in successfully! 🎉')
        navigate('/dashboard')
      })
    } else {
      toast.error('OAuth login failed')
      navigate('/login')
    }
  }, [])

  return (
    <div className="animated-bg min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-primary-500/30 border-t-primary-500 rounded-full animate-spin mx-auto mb-4" />
        <p className="text-white/60">Completing login...</p>
      </div>
    </div>
  )
}
