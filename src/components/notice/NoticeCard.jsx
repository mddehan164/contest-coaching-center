import React from 'react';
import { noticeStudyPrograms } from '../../data/data';
import Card from '../Card';

const NoticeCard = () => {
  return (
    <div className='pt-6 sm:flex sm:gap-3 sm:h-auto'>
      {noticeStudyPrograms.map((program, index) => (
        <Card data={program} key={index} />
      ))}
    </div>
  );
};

export default NoticeCard;
