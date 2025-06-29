import React from 'react'
import { Outlet } from 'react-router'

const Dashboard = () => {
  return (
    <div>
      <main>
        <Outlet/>
      </main>
    </div>
  )
}

export default Dashboard
