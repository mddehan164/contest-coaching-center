import React from 'react';
import { FaFileDownload } from "react-icons/fa";

const NoticePanel = ({ notices }) => {
  if (!notices || notices.length === 0) {
    return <p className='text-sm text-gray-500 p-2'>কোনো নোটিশ পাওয়া যায়নি।</p>;
  }

  const currentDateObj = notices[0]; // প্রথম অবজেক্টে currentDate
  const noticeList = notices.slice(1); // বাকি সব নোটিশ

  return (
    <div className='w-full'>
      <p className='text-sm text-headerColor border-b border-gray-300'>{currentDateObj.currentDate}</p>
      <div className='overflow-auto max-sm:h-60 sm:h-44 lg:h-36 xl:h-72'>
        {noticeList.length > 0 ? (
          noticeList.map((notice, index) => (
            <div key={index} className='text-xs flex justify-start items-center gap-2 p-2 border-b border-gray-300 hover:bg-gray-100 cursor-pointer md:text-lg lg:text-base xl:text-lg'>
              <FaFileDownload className='text-headerColor text-sm flex-shrink-0 md:text-lg'/>
              <span>
                <p>{notice.title} - <span className='text-headerColor'>{notice.date}</span></p>
              </span>
            </div>
          ))
        ) : (
          <p className='text-sm text-gray-500 p-2'>কোনো নোটিশ পাওয়া যায়নি।</p>
        )}
      </div>
    </div>
  );
};

export default NoticePanel;
