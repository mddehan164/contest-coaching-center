import React from 'react'
import HeaderDetails from './HeaderDetails.jsx'
import HeaderIcons from './HeaderIcons.jsx'
import { NavbarMain } from '../index.jsx'




const Header = () => {
  return (
    <header className='w-full text-white px-0 py-0' >
      <div className='flex items-center justify-between w-full gap-10 px-20 bg-headerColor text-headerTextColor max-sm:gap-2 max-sm:p-2 max-sm:flex-col max-md:flex-wrap max-md:gap-5 max-md:p-2'>
           <HeaderDetails />
           <HeaderIcons /> 
      </div>
      <div>
        <NavbarMain />
      </div>
    </header>
  )
}

export default Header
