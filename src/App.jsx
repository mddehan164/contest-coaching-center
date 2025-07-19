import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './pages';
import MainLayout from './layout/MainLayout';
import Dashboard from './layout/Dashboard';
import DHome from './dashboardPages/DHome';
import { dashboardPageRoutes, mainPageRoutes } from './data/routesData';




const App = () => {
  return (
    <>
      <BrowserRouter>
         <Routes>

          {/* 🔵 Main layout with Header/Footer */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            {
              mainPageRoutes.map((route, idx) => <Route key={idx} path={route.path} element={route.route}/>)
            }
          </Route>

          {/* 🔴 Dashboard layout - without header/footer */}
          <Route path="dashboard" element={<Dashboard />}>
            <Route index element={<DHome />} />
            {
              dashboardPageRoutes.map((route, idx) => <Route key={idx} path={route.path} element={route.route}/>)
            }
          </Route>

      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
