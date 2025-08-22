// src/redux/slices/authSlice.js
import { createSlice } from "@reduxjs/toolkit"

// Function to get token from cookies
const getCookie = (name) => {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop().split(';').shift()
  return null
}

// Function to get user from localStorage
const getUserFromStorage = () => {
  try {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : null
  } catch (error) {
    return null
  }
}

const initialState = {
  user: getUserFromStorage(),
  accessToken: getCookie('access_token'),
  isAuthenticated: !!getCookie('access_token'),
  authChecked: false,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, accessToken } = action.payload
      state.user = user
      state.accessToken = accessToken
      state.isAuthenticated = !!accessToken
      
      // Persist to localStorage and cookies
      try {
        if (accessToken) {
          // Store in cookie for API requests
          document.cookie = `access_token=${accessToken}; max-age=${24 * 60 * 60}; path=/; secure=${window.location.protocol === 'https:'}; samesite=strict`
        }
        if (user) {
          localStorage.setItem('user', JSON.stringify(user))
        }
      } catch (error) {
        console.error('Failed to save credentials:', error)
      }
    },
    logout: (state) => {
      state.user = null
      state.accessToken = null
      state.isAuthenticated = false
      state.authChecked = true // Mark as checked to prevent loading state
      
      // Clear localStorage and cookies
      try {
        localStorage.removeItem('user')
        document.cookie = 'access_token=; Max-Age=0; path=/;'
        document.cookie = 'XSRF-TOKEN=; Max-Age=0; path=/;'
        document.cookie = 'laravel_session=; Max-Age=0; path=/;'
      } catch (error) {
        console.error('Failed to clear credentials:', error)
      }
    },
    setAuthChecked: (state) => {
      state.authChecked = true
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload }
    },
  },
})

export const { setCredentials, logout, setAuthChecked, updateUser } = authSlice.actions

export default authSlice.reducer

export const selectCurrentUser = (state) => state.auth.user
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated
export const selectAuthChecked = (state) => state.auth.authChecked