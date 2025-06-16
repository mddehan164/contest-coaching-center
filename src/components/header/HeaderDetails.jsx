import React from 'react'
import {headerData} from '../../data/data.js';

const HeaderDetails = () => {
  return (
        <div className='flex gap-6 max-sm:gap-1 max-sm:text-[5vw] max-md:gap-2  '>
          {
            headerData.headerS1.map((item, index) => (
              <div className='flex items-center justify-between px-4 py-2 gap-1 max-sm:px-1' key={index}>
                  <item.icon/>
                  <span>{item.data}</span>
              </div>
            ))
        } 
        </div>
  )
}

export default HeaderDetails
