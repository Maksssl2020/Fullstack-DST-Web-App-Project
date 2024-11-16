import React from "react";
import CloseIcon from "../drawer/icons/CloseIcon.jsx";
import { createPortal } from "react-dom";
import Spinner from "../universal/Spinner.jsx";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { motion } from "framer-motion";
import useInstagramPostImages from "../../hooks/queries/useInstagramPostImages.js";
import { InstagramPost } from "../../models/InstagramPost";
import { InstagramPostImage } from "../../models/InstagramPostImage";

type InstagramPostModalProps = {
  selectedPost: InstagramPost;
  onClick: () => void;
};

const InstagramPostModal = ({
  selectedPost,
  onClick,
}: InstagramPostModalProps) => {
  const { instagramPostImages, fetchingInstagramPostImages } =
    useInstagramPostImages(selectedPost.postId);

  if (fetchingInstagramPostImages) {
    return <Spinner />;
  }

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 opacity-100 backdrop-blur transition-opacity duration-300 ease-in-out`}
    >
      <button
        className="absolute inset-0 z-10 ml-auto mr-4 mt-4 size-24 text-white"
        onClick={onClick}
      >
        <CloseIcon size={"size-24"} />
      </button>
      <div
        className={`relative flex h-[750px] w-[1450px] scale-100 transform rounded-lg transition-transform duration-300 ease-in-out`}
      >
        <div className="h-full w-[70%]">
          {instagramPostImages.length > 1 ? (
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
              {instagramPostImages.map(
                (postData: InstagramPostImage, index: number) => (
                  <SwiperSlide key={index}>
                    <img
                      src={postData.media_url}
                      alt={selectedPost.caption}
                      className="inset-0 z-10 h-[750px] w-full self-center rounded-l-3xl object-cover"
                    />
                  </SwiperSlide>
                ),
              )}
            </Swiper>
          ) : (
            <img
              src={selectedPost.media_url}
              alt={selectedPost.caption}
              className="inset-0 z-10 h-[750px] w-full self-center rounded-l-3xl object-cover"
            />
          )}
        </div>
        <div className="relative flex h-[750px] w-[30%] flex-col rounded-r-3xl bg-custom-gray-100">
          <div className="flex h-[100px] w-full items-center justify-center gap-4 rounded-tr-xl bg-custom-gray-200 text-2xl font-bold">
            <img
              className="inset-0 size-20 rounded-full object-cover"
              src="/assets/images/website-logo.jpg"
              alt={"logo"}
            />
            {selectedPost.username}
          </div>
          <textarea
            value={selectedPost.caption}
            readOnly
            className="h-[75%] resize-none bg-custom-gray-100 px-6 py-2 focus:outline-none"
          ></textarea>
          <a
            className={
              "button-gradient mb-4 mt-auto flex h-[75px] w-[350px] items-center justify-center self-center rounded-2xl font-bold uppercase text-white"
            }
            href={selectedPost.permalink}
            target="_blank"
            rel="noopener noreferrer"
          >
            <p className="flex h-[70%] w-[95%] items-center justify-center rounded-xl border-4 border-white">
              Zobacz na instagramie
            </p>
          </a>
        </div>
      </div>
    </motion.div>,
    document.body,
  );
};

export default InstagramPostModal;
