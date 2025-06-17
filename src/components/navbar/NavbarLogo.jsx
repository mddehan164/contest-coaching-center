import React from 'react'
import {navData} from '../../data/data'

const NavbarLogo = () => {
  const {logo, title, subTitle} = navData.navbar;
  return (
    <div className='w-1/6 h-auto flex items-center justify-center bg-white py-4 gap-3 max-sm:w-1/2 max-sm:gap-1 max-sm:py-2 max-md:w-1/3 max-md:gap-1 max-md:py-3 max-md:px-0'>
      <img src={logo} alt="Contest" className='w-1/4 max-sm:w-1/3'/>
      <div className=''>
        <h1 className='font-semibold text-5xl max-sm:text-lg max-sm:leading-3 max-md:text-[5vw]'>{title}</h1>
        <p className='text-base text-headerColor max-sm:text-[2.5vw] max-sm:leading-3 max-md:text-[1.8vw] max-md:leading-4'>{subTitle}</p>
      </div>
    </div>
  )
}

export default NavbarLogo
