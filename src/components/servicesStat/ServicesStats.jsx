import React from 'react'
import QuickStat from '../QuickStat'
import { services } from '../../data/data'

const ServicesStats = () => {
  return (
    <div className='w-full mt-20 p-3 sm:mt-24 xl:mt-28'>
      <h1 className='text-center text-2xl font-semibold text-headerColorHover my-5 xl:mb-10 xl:text-3xl'>{services.title}</h1>

       <div className='w-full flex justify-center flex-wrap gap-2 sm:gap-4'>
            {services.data.map((service, index) => (
                <div key={index} className='aspect-square w-[48%] sm:w-[30%] md:w-[23%] lg:w-[14%] p-1 rounded-md cursor-pointer'>
                <QuickStat data={service} />
                </div>
            ))}
        </div>
    </div>
  );
}

export default ServicesStats;
