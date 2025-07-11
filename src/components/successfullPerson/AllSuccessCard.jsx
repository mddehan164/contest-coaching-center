import React from 'react'
import {successData} from '../../data/SuccessfulStudentData';
import Stats from '../stats/Stats';

const AllSuccessCard = () => {
  return (
    <div className='w-full relative px-5 sm:px-0'>
      <h1 className='w-full text-xl font-bold text-center my-6 text-headerColorHover sm:text-3xl md:text-2xl md:mt-8 lg:mt-3 xl:text-3xl'>{successData.mainTitle}</h1>
      <div className='flex flex-wrap justify-center items-center gap-5'>
        {
          successData.mainData.map((stat, index) => (<div key={index} className='w-full sm:w-[70%] md:w-1/3 lg:w-1/4'><Stats stat={stat}/></div>))
        }
      </div>
    </div>
  )
}

export default AllSuccessCard
