import React from 'react'
import { noticeBtnData } from '../../data/data'
import { useStateContext } from '../../context/ContextProvider'
import MainBtn from '../mainBtn';

const NoticeBtn = () => {
    const {activeTab, setActiveTab} = useStateContext();
  return (
    <div className='flex flex-wrap gap-1 pt-2 w-full'>
      {noticeBtnData.btnName.map((btn, idx) => {
        const isActive = activeTab === btn;
        return (
          <MainBtn
            key={idx}
            btnName={btn}
            data={btn}
            btnStyle={noticeBtnData.btnStyle}
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