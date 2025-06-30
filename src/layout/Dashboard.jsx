import React from 'react'
import { Outlet } from 'react-router'
import DHeaderMain from '../components/DHeader/DHeaderMain'
import DSidebar from '../components/DSidebar/DSidebar'


const Dashboard = () => {
  return (
    <div className="min-h-screen grid grid-rows-[80px_1fr] grid-cols-1 md:grid-cols-[200px_1fr] md:grid-rows-[80px_1fr]">

      {/* Header */}
      <header className="row-span-1 col-span-full bg-headerColor flex justify-center items-center text-white font-bold text-lg">
        <DHeaderMain/>
      </header>

      {/* Sidebar */}
      <nav className="hidden md:flex flex-col bg-headerColorHover text-white p-4 space-y-2">
        <DSidebar/>
      </nav>

      {/* Main Content */}
      <main className="p-5 overflow-x-hidden overflow-y-auto bg-gray-100">
        <Outlet/>
      </main>

  </div>
  )
}

export default Dashboard
