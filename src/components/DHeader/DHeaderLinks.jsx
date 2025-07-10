import React from 'react'
import { headerData } from '../../data/Dsidebar&Header'
import { Link } from 'react-router'


const DHeaderLinks = () => {
    
  return (
    <div className='w-1/2 text-end px-2 flex items-center justify-end gap-4 text-xl sm:text-2xl sm:gap-7'>
      {
        headerData.icons.map((icon, idx) => <Link
         key={idx} 
         to={icon.link}
         className='hover:text-headerColorHover inline-block relative'
         >{<icon.icon/>}<div className={`absolute top-0 left-0 w-1/5 aspect-square rounded-full ${icon.new ? "bg-contestRed animate-ping" : "bg-transparent"}`}></div></Link>)
      }
    </div>
  )
}

export default DHeaderLinks
