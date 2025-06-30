import React from 'react'
import { Outlet } from 'react-router'
import DHeaderMain from '../components/DHeader/DHeaderMain'
import DSidebar from '../components/DSidebar/DSidebar'


const Dashboard = () => {
  return (
    <div className="min-h-screen grid grid-rows-[80px_1fr] grid-cols-1 md:grid-cols-[300px_1fr] md:grid-rows-[80px_1fr] gap-1 p-1">

      {/* Header */}
      <header className="row-span-1 col-span-full bg-headerColor flex justify-center items-center text-white font-bold text-lg rounded-lg">
        <DHeaderMain/>
      </header>

      {/* Sidebar */}
      <nav className="hidden md:flex flex-col bg-headerColorHover text-white p-4 space-y-2 rounded-lg">
        <DSidebar/>
      </nav>

      {/* Main Content */}
      <main className="bg-white p-6 overflow-x-hidden overflow-y-auto">
        <Outlet/>
      </main>

  </div>
  )
}

export default Dashboard
