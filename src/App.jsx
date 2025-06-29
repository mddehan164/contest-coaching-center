import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import { Home, Courses, Branches, Login, Admission } from './pages';
import { Error, RegisterForm } from './components';
import MainLayout from './layout/MainLayout';
import Dashboard from './layout/Dashboard';
import DHome from './dashboardPages/DMain';



const App = () => {
  return (
    <>
      <BrowserRouter>
         <Routes>

          {/* 🔵 Main layout with Header/Footer */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="courses" element={<Courses />} />
            <Route path="admission" element={<Admission />} />
            <Route path="branches" element={<Branches />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<RegisterForm />} />
            <Route path="*" element={<Error />} />
          </Route>

          {/* 🔴 Dashboard layout - without header/footer */}
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<DHome />} />
            <Route />
          </Route>

      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
