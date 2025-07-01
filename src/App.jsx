import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import { Home, Courses, Branches, Login, Admission } from './pages';
import { Error, RegisterForm, Slider } from './components';
import MainLayout from './layout/MainLayout';
import Dashboard from './layout/Dashboard';
import DHome from './dashboardPages/DHome';
import { DSlider, Help, Logout, Notice, Schedule, Settings, Student, Teacher } from './dashboardPages';




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
          <Route path="dashboard" element={<Dashboard />}>
            <Route index element={<DHome />} />
            <Route path="schedule" element={<Schedule/>} />
            <Route path="student" element={<Student/>} />
            <Route path="teacher" element={<Teacher/>} />
            <Route path="slider" element={<DSlider/>} />
            <Route path="notice" element={<Notice/>} />
            <Route path="settings" element={<Settings/>} />
            <Route path="help" element={<Help/>} />
            <Route path="logout" element={<Logout/>} />
          </Route>

      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
