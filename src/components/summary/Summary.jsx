import React from 'react'
import {summary} from '../../data/data';
import QuickStat from '../QuickStat';

const Summary = () => {
  return (
    <div className='w-full mt-20 p-3 sm:mt-24 xl:mt-28'>
      <h1 className='text-center text-2xl font-semibold text-headerColorHover my-5 xl:mb-10 xl:text-3xl'>{summary.title}</h1>

       <div className='w-full flex justify-center flex-wrap gap-5 sm:gap-4 md:gap-5 lg:gap-5 xl:gap-8'>
            {summary.data.map((service, index) => (
                <div key={index} className='aspect-square w-[80%] sm:w-[30%] md:w-[23%] lg:w-[23%] xl:w-[20%] p-3 rounded-md cursor-pointer shadow-[0_0_3px_rgba(0,0,0,0.25)] hover:scale-105 hover:shadow-[0_0_12px_rgba(0,0,0,0.25)] transition-all duration-300 ease-in-out'>
                <QuickStat data={service} />
                </div>
            ))}
        </div>
    </div>
  )
}

export default Summary
