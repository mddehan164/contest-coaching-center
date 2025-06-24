import React from 'react'
import { courseData } from '../../data/data';
import Card from '../Card';
import MainBtn from '../mainBtn';
import { NavLink } from 'react-router';


const CourseMain = () => {
  return (
    <div className='w-full max-sm:p-3 sm:pt-10 relative'>
        <h1 className='text-center max-sm:text-lg font-semibold text-headerColorHover sm:py-8 sm:text-2xl xl:text-3xl'>{courseData.title}</h1>
      <div className='sm:flex sm:flex-wrap sm:gap-8 md:flex sm:justify-center lg:w-full'>
        {
          courseData.courses.map((course, idx) => <Card key={idx} data={course}/>)
        }
      </div>
      <div className='w-full flex justify-end items-center absolute xl:-bottom-20 xl:right-20 max-sm:-bottom-10 max-sm:right-2 sm:-bottom-16 md:right-2'>
        <NavLink to="/courses"><MainBtn
                                      data={courseData.btnData.btnName}
                                      btnStyle={courseData.btnData.btnStyle}
                                    />
          </NavLink>
        
      </div>
    </div>
  )
}

export default CourseMain
