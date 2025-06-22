import React from 'react'
import {Courses, NoticeMain, Slider, StatsMain, SuccessCards} from '../components/index'

const Home = () => {
  return (
    <div className='max-sm:px-1 sm:px-5 md:px-10 lg:px-20 xl:px-44'>
      <Slider />
      <NoticeMain />
      <Courses />
      <StatsMain />
      <SuccessCards />
    </div>
  )
}

export default Home
