import React from 'react'

const DMain = () => {
  return (
    <div className="min-h-screen grid grid-rows-[60px_1fr] grid-cols-1 md:grid-cols-[300px_1fr] md:grid-rows-[60px_1fr]">

      {/* Header */}
      <header className="row-span-1 col-span-full bg-cyan-500 flex justify-center items-center text-white font-bold text-lg">
        
      </header>

      {/* Sidebar */}
      <nav className="hidden md:flex flex-col bg-sky-900 text-white p-4 space-y-2">
        
      </nav>

      {/* Main Content */}
      <main className="bg-white p-6 overflow-x-hidden overflow-y-auto">
        
      </main>

  </div>

  )
}

export default DMain
