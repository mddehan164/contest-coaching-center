import React from 'react'
import Navbar from './Navbar'
import {headerData} from '../data/data.js';

const Header = () => {
  return (
    <header className='w-full text-white lg:px-[220px] py-0' >
      <div className='flex items-center justify-between w-full gap-10 px-20' style={{ backgroundColor: headerData.headerBg.color, color: headerData.headerBg.textColor }}>
        <div className='flex gap-6'>
          {
            headerData.headerS1.map((item, index) => (
              <div className='flex items-center justify-between px-4 py-2 gap-1' key={index}>
                  <item.icon/>
                  <span>{item.data}</span>
              </div>
            ))
        } 
        </div>
        <div className='flex gap-5'>
          {
            headerData.headerS2.map((item, index) => (
              <div className='flex items-center justify-between' key={index}>
                  <item.icon className="cursor-pointer transition duration-300 hover:drop-shadow-[0_0_8px_white] hover:scale-150"/>
              </div>
            ))
        } 
        </div>
      </div>
      <Navbar />
    </header>
  )
}

export default Header
