import React from "react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./HomeNewsSliderStyle.css";
import HomeNewsCard from "../card/HomeNewsCard";

const HomeNewsCardSlider = ({ sliderData }) => {
  const data = sliderData;
  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<div class="' + className + '">' + (index + 1) + "</div>";
    },
  };

  return (
    <div className="flex w-full bg-custom-gray-400 self-center h-auto">
      <Swiper
        className="w-[80%] pl-20 pr-2 flex justify-center"
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={35}
        slidesPerView={3}
        navigation={true}
        pagination={pagination}
        speed={2500}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
      >
        {data.map((data, index) => (
          <SwiperSlide className="mb-20">
            <HomeNewsCard key={data.id} cardData={data} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HomeNewsCardSlider;
