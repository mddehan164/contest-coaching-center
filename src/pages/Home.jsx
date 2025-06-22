import React from 'react'
import {Courses, NoticeMain, Slider} from '../components/index'

const Home = () => {
  return (
    <div className='max-sm:px-1 sm:px-5 md:px-10 lg:px-44'>
      <Slider />
      <NoticeMain />
      <Courses />
    </div>
  )
}

export default Home
