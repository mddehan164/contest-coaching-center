import React from 'react'
import { noticeData } from '../../data/data'
import MainBtn from '../MainBtn'
import { useStateContext } from '../../context/ContextProvider'

const NoticeBtn = () => {
    const {activeTab, setActiveTab} = useStateContext();
  return (
    <div className='flex flex-wrap gap-1 pt-2 w-full'>
      {noticeData.btnData.btnName.map((btn, idx) => {
        const isActive = activeTab === btn;
        return (
          <MainBtn
            key={idx}
            btnName={btn}
            data={btn}
            btnStyle={noticeData.btnData.btnStyle}
            isActive={isActive}
            onClick={() => setActiveTab(btn)}
          />
        )
      })}
      <hr className='w-full'/>
    </div>
  )
}

export default NoticeBtn