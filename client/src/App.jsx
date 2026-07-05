import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import useAuthStore from './store/authStore'

import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import OAuthCallback from './pages/OAuthCallback'
import Dashboard from './pages/Dashboard'
import UploadResume from './pages/UploadResume'
import TestPage from './pages/TestPage'
import Results from './pages/Results'
import ResumeBuilder from './pages/ResumeBuilder'
import History from './pages/History'
import Profile from './pages/Profile'
import CompanyPrep from './pages/CompanyPrep'
import CompanyDetail from './pages/CompanyDetail'


const ProtectedRoute = ({ children }) => {
  const { token } = useAuthStore()
  return token ? children : <Navigate to="/login" replace />
}

const AuthRoute = ({ children }) => {
  const { token } = useAuthStore()
  return !token ? children : <Navigate to="/dashboard" replace />
}

export default function App() {
  const { fetchUser } = useAuthStore()

  useEffect(() => {
    fetchUser()
  }, [])

  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#1a1a2e',
            color: '#fff',
            border: '1px solid rgba(108,99,255,0.3)',
            borderRadius: '12px'
          },
          success: { iconTheme: { primary: '#10B981', secondary: '#fff' } },
          error: { iconTheme: { primary: '#EF4444', secondary: '#fff' } }
        }}
      />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<AuthRoute><Login /></AuthRoute>} />
        <Route path="/register" element={<AuthRoute><Register /></AuthRoute>} />
        <Route path="/oauth/callback" element={<OAuthCallback />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/upload-resume" element={<ProtectedRoute><UploadResume /></ProtectedRoute>} />
        <Route path="/test/:testId" element={<ProtectedRoute><TestPage /></ProtectedRoute>} />
        <Route path="/results/:testId" element={<ProtectedRoute><Results /></ProtectedRoute>} />
        <Route path="/resume-builder" element={<ProtectedRoute><ResumeBuilder /></ProtectedRoute>} />
        <Route path="/history" element={<ProtectedRoute><History /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/company-prep" element={<ProtectedRoute><CompanyPrep /></ProtectedRoute>} />
        <Route path="/company/:name" element={<ProtectedRoute><CompanyDetail /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
        
      </Routes>
    </BrowserRouter>
  )
}
