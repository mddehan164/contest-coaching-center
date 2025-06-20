import React from 'react'
import {navData} from '../../data/data'

const NavbarLogo = () => {
  const {logo, title, subTitle} = navData.data;
  return (
    <div className='w-1/6 h-auto flex items-center justify-center py-4 gap-3 max-sm:w-1/2 max-sm:gap-1 max-sm:py-2 sm:w-1/4 sm:gap-1 sm:py-3 sm:px-0 '>
      <img src={logo} alt="Contest" className='w-1/4 max-sm:w-1/4 lg:w-1/5'/>
      <div className=''>
        <h1 className='font-semibold text-5xl max-sm:text-xl max-sm:leading-4 sm:text-2xl lg:text-3xl xl:text-4xl xl:leading-[1.3]'>{title}</h1>
        <p className='text-base text-headerColor max-sm:text-[2.2vw] max-sm:leading-5
         sm:text-[1.3vw] sm:leading-5 lg:text-[1.1vw] xl:text-[0.8vw] xl:leading-8'>{subTitle}</p>
      </div>
    </div>
  )
}

export default NavbarLogo
