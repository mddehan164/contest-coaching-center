import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cube';
import { Autoplay, EffectCube } from 'swiper/modules';
import { sliderData } from '../data/data';
import { motion } from "motion/react"


export default function CubeSlider() {
  return (
    <Swiper
     
      modules={[Autoplay, EffectCube]}
      effect="cube"
      cubeEffect={{
        shadow: false,
        slideShadows: false,
      }}
      speed={600}  // কমিয়ে smooth করার চেষ্টা
      autoplay={{
        delay: 3500,
        disableOnInteraction: false,
      }}
      loop={true}
      slidesPerView={1}
      className="w-full mx-auto"
      style={{ willChange: 'transform', backfaceVisibility: 'hidden' }}
    >
      {
        sliderData.sliderImg.map((img, index) => (
          <SwiperSlide 
           
          key={index}>
            <motion.img
              initial={{
                scale:0,
                opacity:0
                }}
                animate={{
                  scale:1,
                  opacity:1,
                  transition:{
                    duration:1,
                    delay:3
                  }
                }}
              src={img}
              alt={`Slide ${index + 1}`}
              className="w-full h-auto object-cover"
              loading="lazy"
              decoding="async"
            />
          </SwiperSlide>
        ))
      }
    </Swiper>
  );
}
