import React from "react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

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
    <div className="flex w-full bg-custom-gray-400 justify-center h-auto">
      <Swiper
        className="max-xl:w-full xl:w-[90%] flex justify-center"
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={15}
        slidesPerView={1}
        navigation={true}
        pagination={pagination}
        speed={2500}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          1280: {
            slidesPerView: 3,
          },
          700: {
            slidesPerView: 2,
          },
        }}
      >
        {data?.map((data, index) => (
          <SwiperSlide key={index} className="flex justify-center mb-20">
            <HomeNewsCard key={data.id} cardData={data} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HomeNewsCardSlider;
