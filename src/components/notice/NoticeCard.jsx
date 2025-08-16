import React from 'react';
import { noticeStudyPrograms, noticeStydyBtnData } from '../../data/data';
import Card from '../Card';

const NoticeCard = () => {
  return (
    <div className='p-3 sm:flex sm:gap-3 sm:h-auto md:gap-7 md:text-sm lg:justify-between md:mt-6 lg:mt-0'>
      {noticeStudyPrograms.map((program, index) => (
        <Card data={program} key={index} btn={noticeStydyBtnData}/>
      ))}
    </div>
  );
};

export default NoticeCard;
