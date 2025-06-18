import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';

export default function AutoSlider() {
  return (
    <Swiper
      modules={[Autoplay]}
      autoplay={{
        delay: 1000, // 1 second per slide
        disableOnInteraction: false,
      }}
      loop={true}
      slidesPerView={1}
      className="w-full max-w-2xl mx-auto"
    >
      <SwiperSlide>
        <div className="bg-blue-200 p-10 text-center rounded-xl">Slide 1</div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="bg-green-200 p-10 text-center rounded-xl">Slide 2</div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="bg-yellow-200 p-10 text-center rounded-xl">Slide 3</div>
      </SwiperSlide>
    </Swiper>
  );
}
