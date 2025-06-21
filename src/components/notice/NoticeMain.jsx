import React from 'react'
import NoticeHeader from './NoticeHeader'
import NoticeBody from './NoticeBody'
import NoticeCard from './NoticeCard'

const NoticeMain = () => {
  return (
    <div className='pt-8 max-sm:pt-4 flex gap-5 flex-wrap max-sm:block lg:justify-between mx-auto w-full'>
      <div className='sm:w-[48%]'>
        <NoticeHeader/>
        <NoticeBody/>
      </div>
      <div className='sm:w-[48%] flex-shrink-0'><NoticeCard /></div>
    </div>
  )
}

export default NoticeMain
