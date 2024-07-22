import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import InstagramPostCard from "../card/InstagramPostCard";

const HomeInstagramSectionCardSlider = ({ sliderData, handlePostClick }) => {
  return (
    <div className="flex w-full justify-center items-center self-center h-full">
      <Swiper
        className="w-[95%] flex justify-center"
        modules={[Navigation, Pagination]}
        spaceBetween={10}
        slidesPerView={4}
        navigation={true}
        centeredSlides={true}
        autoplay={true}
        loop={true}
      >
        {sliderData.slice(4).map((post) => (
          <SwiperSlide key={post.id}>
            <InstagramPostCard
              key={post.id}
              post={post}
              onClick={() => handlePostClick(post)}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HomeInstagramSectionCardSlider;
