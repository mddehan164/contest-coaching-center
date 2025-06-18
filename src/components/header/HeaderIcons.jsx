import React from 'react'
import {headerData} from '../../data/data.js';


const HeaderIcons = () => {
  return (
        <div className='flex gap-5 max-sm:gap-3'>
          {
            headerData.headerS2.map((item, index) => (
              <div className='flex items-center justify-between' key={index}>
                  <item.icon className="cursor-pointer transition duration-300 hover:drop-shadow-[0_0_8px_white] hover:scale-150 max-sm:text-sm"/>
              </div>
            ))
        } 
        </div>
  )
}

export default HeaderIcons
