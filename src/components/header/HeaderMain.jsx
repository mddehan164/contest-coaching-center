import React from 'react'
import HeaderDetails from './HeaderDetails.jsx'
import HeaderIcons from './HeaderIcons.jsx'
import { NavbarMain } from '../index.jsx'




const Header = () => {
  return (
    <header className='w-full text-white px-0 py-0' >
      <div className='flex items-center justify-between w-full gap-10 px-40 bg-headerColor text-headerTextColor max-sm:gap-1 max-sm:p-1 sm:px-5 md:px-10 lg:px-44'>
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
