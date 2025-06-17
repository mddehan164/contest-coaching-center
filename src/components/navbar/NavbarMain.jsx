import React from 'react'
import NavbarLogo from './NavbarLogo'
import NavbarLinks from './NavbarLinks'

const Navbarmain = () => {
  return (
   <nav className='text-black bg-blue-200 w-full flex justify-between items-center relative px-40 max-sm:px-2 '>
      <NavbarLogo />
      <NavbarLinks />
      
   </nav>
  )
}

export default Navbarmain
