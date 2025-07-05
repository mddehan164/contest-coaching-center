import React from 'react';
import { Slider } from '../components';
import { Link } from 'react-router';
import NoticeHeader from '../components/notice/NoticeHeader';
import NoticeBody from '../components/notice/NoticeBody';
import { courseData, successData } from '../data/data';
import Card from '../components/Card';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Stats from '../components/stats/Stats';

const DHome = () => {
  return (
    <div className='xl:text-xl xl:px-44'>
      <h1 className='text-center xl:text-4xl'>Edit <strong className='text-headerColor'>UI</strong></h1>

      {/* Slider Section */}
      <div className='w-full flex items-center justify-center gap-10 bg-gray-100 mt-5 rounded-lg shadow-lg'>
        <div className='w-1/2 mb-8'>
          <h3 className='my-3 text-2xl text-headerColorHover'>Current Slider</h3>
          <Slider/>
        </div>
        <Link to="slider" className='bg-headerColor sm:text-sm lg:text-lg xl:text-xl px-6 py-3 rounded-md hover:bg-headerColorHover hover:text-white'>Edit</Link>
      </div>

      {/* Notice Section */}
      <div className='w-full flex items-center justify-center gap-10 mt-10 rounded-lg shadow-lg'>
        <div className='w-1/2 mb-8'>
          <h3 className='my-3 text-2xl text-headerColorHover'>Current Notices</h3>
          <NoticeHeader/>
          <NoticeBody/>
        </div>
        <Link to="notice" className='bg-headerColor sm:text-sm lg:text-lg xl:text-xl px-6 py-3 rounded-md hover:bg-headerColorHover hover:text-white'>Edit</Link>
      </div>

      <div className='w-full flex items-center justify-between px-5 mt-10 rounded-lg shadow-lg bg-gray-100'>
        <div className='w-[80%] mb-8'> 
          <h3 className='my-3 text-2xl text-headerColorHover'>Current Courses</h3>
          <Swiper
            breakpoints={{
              0: { slidesPerView: 1.5, spaceBetween: 10 },
              480: { slidesPerView: 2, spaceBetween: 15 },
              640: { slidesPerView: 2.5, spaceBetween: 20 },
              768: { slidesPerView: 3, spaceBetween: 25 },
              1024: { slidesPerView: 2, spaceBetween: 30 },
              1280: { slidesPerView: 3.2, spaceBetween: 30 },
            }}
          >
            {
              courseData.courses.map((course, idx) => (
                <SwiperSlide key={idx}>
                  <Card data={course} />
                </SwiperSlide>
              ))
            }
          </Swiper>
        </div>
        <Link to="course-editor" className='bg-headerColor sm:text-sm lg:text-lg xl:text-xl px-6 py-3 rounded-md hover:bg-headerColorHover hover:text-white'>Edit</Link> {/* লিংক 'notice' থেকে 'courses' এ পরিবর্তন করা হয়েছে */}
      </div>

      <div className='w-full flex items-center justify-between px-5 mt-10 rounded-lg shadow-lg'>
        <div className='w-[80%] mb-8'> 
          <h3 className='my-3 text-2xl text-headerColorHover'>Current Successfull Persons</h3>
          <Swiper
            breakpoints={{
              0: { slidesPerView: 1.5, spaceBetween: 10 },
              480: { slidesPerView: 2, spaceBetween: 15 },
              640: { slidesPerView: 2.5, spaceBetween: 20 },
              768: { slidesPerView: 3, spaceBetween: 25 },
              1024: { slidesPerView: 2, spaceBetween: 30 },
              1280: { slidesPerView: 3.2, spaceBetween: 30 },
            }}
          >
          {
            successData.mainData.map((stat, index) => (<SwiperSlide key={index} className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4'><Stats stat={stat}/></SwiperSlide>))
          }
          </Swiper>
        </div>
        <Link to="success-editor" className='bg-headerColor sm:text-sm lg:text-lg xl:text-xl px-6 py-3 rounded-md hover:bg-headerColorHover hover:text-white'>Edit</Link> {/* লিংক 'notice' থেকে 'courses' এ পরিবর্তন করা হয়েছে */}
      </div>
    </div>
  );
};

export default DHome;