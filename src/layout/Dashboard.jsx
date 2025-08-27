import React from 'react'
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router'
import DHeaderMain from '../components/DHeader/DHeaderMain'
import DSidebar from '../components/DSidebar/DSidebar'

const Dashboard = () => {
  const isExpand = useSelector(state => state.ui.isExpand);
  
  return (
    <div className={`min-h-screen grid grid-rows-[90px_1fr] grid-cols-1 md:grid-rows-[80px_1fr] ${isExpand ? "md:grid-cols-[250px_1fr]" : "md:grid-cols-[90px_1fr]"}`}>

      {/* Header */}
      <header className="row-span-1 col-span-full bg-headerColor flex justify-center items-center text-white font-bold text-lg">
        <DHeaderMain/>
      </header>

      {/* Sidebar */}
      <nav className="hidden md:flex flex-col bg-headerColorHover text-white p-4 space-y-2">
        <DSidebar/>
      </nav>

      {/* Main Content */}
      <main className="p-5 overflow-x-hidden overflow-y-auto bg-slate-50 max-h-[91vh]">
        <Outlet/>
      </main>

  </div>
  )
}

export default Dashboard
