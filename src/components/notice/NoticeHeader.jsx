import React from 'react'
import { RiSpam2Fill } from "react-icons/ri";

const NoticeHeader = () => {
  return (
    <div className='max-sm:pt-5 w-full'>
      <div>
        <div className='flex gap-2 items-center pb-1 text-headerColor'>
          <RiSpam2Fill/>
          <h3 className='sm:text-xl font-semibold'>Notice</h3>
        </div>
        <div className='w-full h-1 bg-headerColor'></div>
      </div>
    </div>
  )
}

export default NoticeHeader
