import Stats from "./Stats";
import { statsData } from "../../data/data";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const StatsMain = () => {
  return (
    <div className="w-full mt-32 px-4 md:px-8 lg:px-16">
      <Swiper
        spaceBetween={20}
        breakpoints={{
          0: { slidesPerView: 1 },
          480: { slidesPerView: 2 },
          640: { slidesPerView: 2.5 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
        className="overflow-visible"
      >
        {statsData.map((stat, index) => (
          <SwiperSlide key={index} className="overflow-visible">
            <div className="relative z-0 hover:z-10 transition-transform duration-300 hover:scale-105">
              <Stats stat={stat} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default StatsMain;
