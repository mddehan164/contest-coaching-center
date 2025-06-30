import React from 'react'
import {headerData} from "../../data/Dsidebar&Header.js"

const DHeaderLogo = () => {
  return (
    <div className='flex w-[48%] items-center justify-center gap-2 md:w-[20%]'>
      <img src={headerData.logo.image} alt={headerData.logo.title} className='w-10 aspect-square lg:w-14'/>
      <div className='w-[70%]'>
        <h1 className='text-xl tracking-[0.15rem] text-start lg:text-3xl'>{headerData.logo.title} </h1>
        <h5 className='text-sm text-start lg:text-lg'>({headerData.logo.subtitle})</h5>
      </div>
    </div>
  )
}

export default DHeaderLogo
