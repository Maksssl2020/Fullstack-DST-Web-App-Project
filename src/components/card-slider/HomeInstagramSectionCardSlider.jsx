import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import InstagramPostCard from "../card/InstagramPostCard";

const HomeInstagramSectionCardSlider = ({ sliderData, handlePostClick }) => {
  return (
    <div className="flex w-full justify-center items-center self-center h-full">
      <Swiper
        className="w-[90%] flex justify-center"
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={10}
        slidesPerView={4}
        initialSlide={4}
        navigation={true}
        centeredSlides={true}
        speed={2500}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
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
