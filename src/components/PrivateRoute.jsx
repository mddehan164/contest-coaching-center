// src/components/PrivateRoute.jsx
import { Navigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Loader from './Loader'
import { selectAuthChecked, selectIsAuthenticated } from '../redux-rtk/auth/authSlice'
import { selectIsLoading } from '../redux-rtk/uiSlice'

const PrivateRoute = ({ children, requiredRoles = [] }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const authChecked = useSelector(selectAuthChecked)
  const isLoading = useSelector(selectIsLoading)
  const user = useSelector(state => state.auth.user)
  const location = useLocation()

  // Show loader while checking authentication
  if (!authChecked || isLoading) {
    return <Loader message="Checking authentication..." />
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // Check role-based access
  if (requiredRoles.length > 0 && user?.role && !requiredRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />
  }

  return children
}

export default PrivateRoute