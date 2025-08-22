// src/App.jsx
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'
import MainLayout from './layout/MainLayout'
import PrivateRoute from './components/PrivateRoute'
import { mainPageRoutes, dashboardPageRoutes } from './data/routesData'
import Dashboard from './layout/Dashboard';
import { DHome } from './dashboardPages'
import { Home } from './pages'

const App = () => {
  const { checkAuth } = useAuth()
  const authChecked = useSelector(state => state.auth.authChecked)

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  if (!authChecked) {
    return <div>Loading...</div>
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        {mainPageRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Route>

      {/* Protected Dashboard Routes */}
      <Route path="/dashboard" element={
        <PrivateRoute requiredRoles={['admin', 'superadmin']}>
          <Dashboard />
        </PrivateRoute>
      }>
        <Route index element={<DHome />} />
        {dashboardPageRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Route>

      {/* 404 Page */}
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  )
}

export default App