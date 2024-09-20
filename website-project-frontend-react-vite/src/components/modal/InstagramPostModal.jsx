import React from "react";
import CloseIcon from "../drawer/icons/CloseIcon.jsx";
import { createPortal } from "react-dom";
import { useQuery } from "react-query";
import { fetchInstagramPostAllImages } from "../../helpers/api-integration/InstagramDataHandling.js";
import Spinner from "../universal/Spinner.jsx";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

const InstagramPostModal = ({ selectedPost, onClick }) => {
  const { data: postImages, isLoading: fetchingPostImages } = useQuery(
    ["instagramPostImages", selectedPost.id],
    () => fetchInstagramPostAllImages(selectedPost.id),
  );

  if (fetchingPostImages) {
    return <Spinner />;
  }

  return createPortal(
    <div
      className={`fixed inset-0 z-50 flex transition-opacity ease-in-out duration-300 items-center justify-center bg-black backdrop-blur bg-opacity-60 opacity-100`}
    >
      <button
        className="absolute z-10 inset-0 text-white size-24 ml-auto mr-4 mt-4"
        onClick={onClick}
      >
        <CloseIcon size={"size-24"} />
      </button>
      <div
        className={`relative flex ease-in-out rounded-lg w-[1450px] h-[750px] transform transition-transform duration-300 scale-100`}
      >
        <div className="w-[70%] h-full">
          {postImages.length > 1 ? (
            <Swiper
              modules={[Navigation, Autoplay]}
              slidesPerView={1}
              navigation={true}
              speed={2500}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
            >
              {postImages.map((postData, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={postData.media_url}
                    alt={selectedPost.caption}
                    className="w-full z-10 h-[750px] inset-0 self-center object-cover rounded-l-3xl"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <img
              src={selectedPost.media_url}
              alt={selectedPost.caption}
              className="w-full z-10 h-[750px] inset-0 self-center object-cover rounded-l-3xl"
            />
          )}
        </div>
        <div className="bg-custom-gray-100 relative h-[750px] flex w-[30%] flex-col rounded-r-3xl">
          <div className="w-full gap-4 justify-center items-center font-bold text-2xl flex h-[100px] bg-custom-gray-200 rounded-tr-xl">
            <img
              className="size-20 inset-0 object-cover rounded-full"
              src="/assets/images/website-logo.jpg"
              alt={"logo"}
            />
            {selectedPost.username}
          </div>
          <textarea
            value={selectedPost.caption}
            readOnly
            className="resize-none h-[75%] bg-custom-gray-100 focus:outline-none px-6 py-2"
          ></textarea>
          <a
            className={
              "mt-auto h-[75px] w-[350px] flex justify-center items-center uppercase font-bold self-center text-white mb-4 button-gradient rounded-2xl"
            }
            href={selectedPost.permalink}
            target="_blank"
            rel="noopener noreferrer"
          >
            <p className="h-[70%] w-[95%] flex justify-center items-center border-4 border-white rounded-xl">
              Zobacz na instagramie
            </p>
          </a>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default InstagramPostModal;
