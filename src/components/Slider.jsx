import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination"; // Pagination CSS
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { sliderData } from "../data/data";

export default function FadeSlider() {
  return (
    <Swiper
      modules={[Autoplay, EffectFade, Pagination]}
      effect="fade"
      fadeEffect={{ crossFade: true }}
      speed={1000} // fade speed
      autoplay={{
        delay: 3200,
        disableOnInteraction: false,
      }}
      loop={true}
      slidesPerView={1}
      pagination={{ clickable: true }} // <-- Bottom dots enabled
      className="w-full mx-auto"
    >
      {sliderData.map((data, index) => (
        <SwiperSlide key={index}>
          <img
            src={data.preview}
            alt={data.title}
            className="w-full h-auto object-cover"
            loading="lazy"
            decoding="async"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
