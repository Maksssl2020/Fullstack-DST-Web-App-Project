import React from "react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./HomeNewsSliderStyle.css";
import HomeNewsCard from "../card/HomeNewsCard";

const testDataSlider = [
  <HomeNewsCard />,
  <HomeNewsCard />,
  <HomeNewsCard />,
  <HomeNewsCard />,
  <HomeNewsCard />,
  <HomeNewsCard />,
];

const HomeNewsCardSlider = () => {
  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<div class="' + className + '">' + (index + 1) + "</div>";
    },
  };

  return (
    <div className="flex w-full justify-center bg-custom-gray-400 items-center self-center h-full">
      <Swiper
        className="max-w-[80%] pl-20 pr-2 flex justify-center"
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={3}
        navigation={true}
        centeredSlides={true}
        pagination={pagination}
        loop={true}
      >
        {testDataSlider.map((card, index) => (
          <SwiperSlide className="mb-20" key={index}>
            {card}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HomeNewsCardSlider;
