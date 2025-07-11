import React from 'react'
import { courseData } from '../data/courseData'
import Card from '../components/Card'
import ScrollAnimatedSection from '../components/ScrollAnimatedSection'

const Courses = () => {
  return (
    <div className='px-1 sm:px-5 md:px-10 lg:px-20 xl:px-36 2xl:px-28'>
      <h1 className='text-lg md:text-2xl xl:text-4xl my-5 font-semibold text-headerColorHover'>Explore Our Courses</h1>
      <ScrollAnimatedSection id="all-course" direction="left">
        <div className='grid grid-cols-1 gap-5 px-7 sm:grid-cols-2 md:grid-cols-3 md:gap-5 lg:grid-cols-4 lg:px-0 2xl:grid-cols-5 2xl:gap-7'>
          {
            courseData.courses.map((course, idx) => <Card key={idx} data={course} />)
          }
        </div>
      </ScrollAnimatedSection>
    </div>
  )
}

export default Courses
