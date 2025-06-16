import React from 'react'
import {navData} from '../../data/data'

const NavbarLogo = () => {
  const {logo, title, subTitle} = navData.navbar;
  return (
    <div className='w-1/6 h-auto flex items-center justify-center bg-white py-4 gap-3'>
      <img src={logo} alt="Contest" className='w-1/4'/>
      <div className='text-justify'>
        <h1 className='text-5xl'>{title}</h1>
        <p className='text-base text-headerColor'>{subTitle}</p>
      </div>
    </div>
  )
}

export default NavbarLogo
