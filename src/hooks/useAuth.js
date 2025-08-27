// src/hooks/useAuth.js
import { useDispatch, useSelector } from 'react-redux'
import { useLoginMutation, useLogoutMutation, useLazyGetProfileQuery } from '../redux-rtk/auth/authApi'
import { setCredentials, logout as logoutAction, setAuthChecked } from '../redux-rtk/auth/authSlice'
import { setLoading, setMessage } from '../redux-rtk/uiSlice'

export const useAuth = () => {
  const dispatch = useDispatch()
  const [loginMutation] = useLoginMutation()
  const [logoutMutation] = useLogoutMutation()
  
  // Use lazy query to avoid automatic execution
  const [getProfile, { data: profile, isLoading: profileLoading }] = useLazyGetProfileQuery()
  
  const user = useSelector(state => state.auth.user)
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  const accessToken = useSelector(state => state.auth.accessToken)

  const login = async (credentials) => {
    try {
      dispatch(setLoading(true))
      const result = await loginMutation(credentials).unwrap()
      
      if (result.success) {
        dispatch(setCredentials({
          user: result.data.user,
          accessToken: result.data.access_token
        }))
        dispatch(setAuthChecked())
        return { success: true, data: result.data }
      }
    } catch (error) {
      dispatch(setMessage(error.data?.message || "Login failed"))
      return { success: false, error: error.data }
    } finally {
      dispatch(setLoading(false))
    }
  }

  const logout = async () => {
    try {
      dispatch(setLoading(true))
      await logoutMutation().unwrap()
    } catch (error) {
      console.error("Logout error:", error)
    } finally {
      dispatch(logoutAction())
      dispatch(setLoading(false))
    }
  }

  const checkAuth = async () => {
    // Only check auth if we have a token stored and are authenticated
    if (!accessToken || !isAuthenticated) {
      dispatch(setAuthChecked())
      return
    }
    
    try {
      const result = await getProfile().unwrap()
      if (result && result.data) {
        dispatch(setCredentials({
          user: result.data.user || result.user,
          accessToken: accessToken
        }))
      }
    } catch (error) {
      console.error("Auth check failed:", error)
      // Only clear credentials if it's a real auth failure, not a logout
      if (error.status === 401 && isAuthenticated) {
        dispatch(logoutAction())
      }
    } finally {
      dispatch(setAuthChecked())
    }
  }

  return {
    user,
    isAuthenticated,
    login,
    logout,
    checkAuth,
    profile,
    profileLoading
  }
}