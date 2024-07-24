import React, { useState } from "react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./HomeNewsSliderStyle.css";
import HomeNewsCard from "../card/HomeNewsCard";
import DeleteWarningModal from "../modal/DeleteWarningModal";

const HomeNewsCardSlider = ({ sliderData, handlePostsDelete }) => {
  const [openModal, setOpenModal] = useState(false);
  const [postId, setPostId] = useState();
  const data = sliderData;
  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<div class="' + className + '">' + (index + 1) + "</div>";
    },
  };

  const handleOpenModal = () => {
    setOpenModal(!openModal);
  };

  const handleGetPostId = (postId) => {
    setPostId(postId);
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
        {data.map((data, index) => (
          <SwiperSlide key={index} className="flex justify-center mb-20">
            <HomeNewsCard
              key={data.id}
              cardData={data}
              handleDelete={handleGetPostId}
              handleModalOpen={handleOpenModal}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      {openModal && (
        <DeleteWarningModal
          itemId={postId}
          handleDeleteFunc={handlePostsDelete}
          onClose={handleOpenModal}
        />
      )}
    </div>
  );
};

export default HomeNewsCardSlider;
