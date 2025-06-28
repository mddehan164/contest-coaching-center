import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import { Home, Courses, Branches, Login, Admission } from './pages';
import { HeaderMain, Error, Footer, RegisterForm } from './components';



const App = () => {
  return (
    <>
      <BrowserRouter>
        <HeaderMain />


         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/admission" element={<Admission />} />
            <Route path="/branches" element={<Branches />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<RegisterForm/>} />
            <Route path="*" element={<Error />} />
         </Routes>

         <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
