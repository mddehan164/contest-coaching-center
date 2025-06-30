import React, { useState } from 'react'
import { sidebarData } from '../../data/Dsidebar&Header'
import { NavLink } from 'react-router'

const DSidebar = () => {
  const [click, setClick] = useState('/dashboard')
  const toggleClick = (link)=>{
    setClick(link);
  }
  return (
    <div>
      {sidebarData.map((group, idx) => (
        <div key={idx} className="sidebar-group my-7 text-zinc-200">
            <h1 className='text-2xl font-semibold my-1 text-white'>{group.title}</h1>
          {
            group.items.map((item, idx) => (<NavLink 
            to={item.link}
            key={idx}
            className={`flex items-center gap-2 text-lg mt-1 px-2 hover:border-l-2 hover:text-contestRed ${click === item.link ? "border-l-4 text-contestRed border-contestRed" : ""}`}
            onClick={()=>toggleClick(item.link)}
             >
              <item.icon/>
              <span>{item.title}</span>
            </NavLink>))
          }
        </div>
      ))}
    </div>
  )
}

export default DSidebar
