import React, { useState } from 'react'
import { sidebarData } from '../../data/Dsidebar&Header'
import { NavLink } from 'react-router'
import { LuArrowRightLeft } from "react-icons/lu";
import { useStateContext } from '../../context/ContextProvider';

const DSidebar = () => {
  const [click, setClick] = useState('/dashboard')
  const toggleClick = (link)=>{
    setClick(link);
  }
  const {isExpand, setIsExpand} = useStateContext();
  const toggleExpand = ()=>{
    setIsExpand(!isExpand);
  }
  return (
    <div className='relative'>
      <LuArrowRightLeft  className='absolute top-0 right-0 cursor-pointer' onClick={toggleExpand}/>
      {sidebarData.map((group, idx) => (
        <div key={idx} className="sidebar-group my-7 text-zinc-200">
            <h1 className={`text-2xl font-semibold my-3 text-white ${!isExpand ? "text-lg tracking-tighter" : ""}`}>{group.title}</h1>
          {
            group.items.map((item, idx) => (<NavLink 
            to={item.link}
            key={idx}
            onClick={()=>toggleClick(item.link)}
             >
              <div className={`relative group flex items-center gap-2 text-lg mt-1 px-1 my-3 hover:border-l-2 hover:text-contestRed ${click === item.link ? "border-l-4 text-contestRed border-contestRed" : ""} ${!isExpand ? "" : ""}`}>
                <item.icon className={`${!isExpand ? "text-2xl shrink-0" : ""}`}/>
                <span>{isExpand && item.title}</span>
                <div className={`absolute bottom-full mb-2 hidden bg-black text-contestRed text-xs rounded px-2 py-1 whitespace-nowrap ${isExpand ? "group-hover:hidden" : "group-hover:block"}`}>
                  {item.title}
                </div>
              </div>
            </NavLink>))
          }
        </div>
      ))}
    </div>
  )
}

export default DSidebar
