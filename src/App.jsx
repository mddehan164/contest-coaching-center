import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import { Home, Courses, Exams, Branches, Login } from './pages';
import { Header, Navbar, Error } from './components';


const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Navbar />


         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/exams" element={<Exams />} />
            <Route path="/branches" element={<Branches />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Error />} />
         </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
