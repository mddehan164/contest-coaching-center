import React from 'react'
import NavbarLogo from './NavbarLogo'
import NavbarLinks from './NavbarLinks'
import NavbarBtn from './NavbarBtn'

const Navbarmain = () => {
  return (
   <nav className='text-black bg-blue-200 w-full flex justify-between items-center'>
      <NavbarLogo />
      <div className='flex'>
        <NavbarLinks />
        <NavbarBtn />
      </div>
   </nav>
  )
}

export default Navbarmain
