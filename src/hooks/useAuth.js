// src/hooks/useAuth.js
import { useDispatch, useSelector } from 'react-redux'
import { useLoginMutation, useLogoutMutation, useGetProfileQuery } from '../redux-rtk/auth/authApi'
import { setCredentials, logout as logoutAction, setAuthChecked } from '../redux-rtk/auth/authSlice'
import { setLoading, setMessage } from '../redux-rtk/uiSlice'

export const useAuth = () => {
  const dispatch = useDispatch()
  const [loginMutation] = useLoginMutation()
  const [logoutMutation] = useLogoutMutation()
  
  // Use the query hook to start the query
  const { data: profile, refetch: refetchProfile, isLoading: profileLoading } = useGetProfileQuery()
  
  const user = useSelector(state => state.auth.user)
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

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
    try {
      // Only refetch if the query has been started
      if (!profileLoading) {
        await refetchProfile()
      }
      dispatch(setAuthChecked())
    } catch (error) {
      console.error("Auth check failed:", error)
      dispatch(setAuthChecked()) // Still mark as checked even if failed
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