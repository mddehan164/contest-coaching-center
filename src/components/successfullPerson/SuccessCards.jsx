import React from 'react'
import {successData} from '../../data/SuccessfulStudentData';
import Stats from '../stats/Stats';
import MainBtn from '../mainBtn';
import { NavLink } from 'react-router';

const SuccessCards = () => {
  const someSuccess = successData.mainData.slice(0,3);
  return (
    <div className='w-full relative'>
      <h1 className='w-full text-xl font-bold text-center my-6 text-headerColorHover sm:text-3xl md:text-2xl md:mt-12 lg:mt-16 xl:text-3xl'>{successData.mainTitle}</h1>
      <div className='flex flex-wrap justify-center items-center gap-5 p-3'>
        {
          someSuccess.map((stat, index) => (<div key={index} className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4'><Stats stat={stat}/></div>))
        }
      </div>
      <div className='w-full flex justify-end items-center absolute xl:-bottom-20 xl:right-20 max-sm:-bottom-10 max-sm:right-2 sm:-bottom-16 md:right-2'>
        <NavLink to="/all-success">
        <MainBtn
            data={successData.btnData.btnName}
            btnStyle={successData.btnData.btnStyle}
          />
         </NavLink>
        
      </div>
    </div>
  )
}

export default SuccessCards
