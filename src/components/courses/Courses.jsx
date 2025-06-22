import React from 'react'
import { courseData } from '../../data/data';
import Card from '../Card';

const CourseMain = () => {
  return (
    <div className='w-full ma-sm:p-3 sm:pt-10'>
        <h1 className='text-center max-sm:text-lg font-semibold text-headerColorHover sm:py-8 sm:text-2xl'>{courseData.title}</h1>
      <div className='sm:flex sm:flex-wrap sm:gap-8 md:flex sm:justify-center lg:w-full'>
        {
          courseData.courses.map((course, idx) => <Card key={idx} data={course}/>)
        }
      </div>
    </div>
  )
}

export default CourseMain
