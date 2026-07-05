import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import api from '../utils/api'

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoading: false,
      error: null,

      setToken: (token) => {
        localStorage.setItem('token', token)
        set({ token })
      },

      login: async (email, password) => {
        set({ isLoading: true, error: null })
        try {
          const res = await api.post('/auth/login', { email, password })
          localStorage.setItem('token', res.data.token)
          set({ user: res.data.user, token: res.data.token, isLoading: false })
          return { success: true }
        } catch (err) {
          const msg = err.response?.data?.message || 'Login failed'
          set({ error: msg, isLoading: false })
          return { success: false, message: msg }
        }
      },

      register: async (name, email, password) => {
        set({ isLoading: true, error: null })
        try {
          const res = await api.post('/auth/register', { name, email, password })
          localStorage.setItem('token', res.data.token)
          set({ user: res.data.user, token: res.data.token, isLoading: false })
          return { success: true }
        } catch (err) {
          const msg = err.response?.data?.message || 'Registration failed'
          set({ error: msg, isLoading: false })
          return { success: false, message: msg }
        }
      },

      fetchUser: async () => {
        const token = localStorage.getItem('token')
        if (!token) return
        try {
          const res = await api.get('/auth/me')
          set({ user: res.data.user, token })
        } catch {
          localStorage.removeItem('token')
          set({ user: null, token: null })
        }
      },

      logout: () => {
        localStorage.removeItem('token')
        set({ user: null, token: null })
      }
    }),
    { name: 'auth-store', partialize: (s) => ({ user: s.user, token: s.token }) }
  )
)

export default useAuthStore
