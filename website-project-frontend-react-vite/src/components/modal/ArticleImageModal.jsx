import React, { useState } from "react";
import { createPortal } from "react-dom";
import CloseIcon from "../drawer/icons/CloseIcon.jsx";
import ChevronLeftIcon from "../../icons/ChevronLeftIcon.jsx";
import ChevronRightIcon from "../../icons/ChevronRightIcon.jsx";
import { motion } from "framer-motion";

const ArticleImageModal = ({ setIsOpen, selectedImageIndex, images }) => {
  const [currentImageIndex, setCurrentImageIndex] =
    useState(selectedImageIndex);
  const [direction, setDirection] = useState(0); // To track the direction of animation

  const handleImageChangeRight = () => {
    if (currentImageIndex < images.length - 1) {
      setDirection(1);
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const handleImageChangeLeft = () => {
    if (currentImageIndex > 0) {
      setDirection(-1);
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`fixed inset-0 z-50 flex transition-opacity ease-in-out duration-300 items-center justify-center bg-black backdrop-blur-lg bg-opacity-60 opacity-100`}
    >
      <button
        onClick={() => setIsOpen(false)}
        className="absolute z-10 inset-0 text-white size-24 ml-auto mr-4 mt-4"
      >
        <CloseIcon size={"max-lg:size-12 lg:size-18"} />
      </button>
      <div
        className={`relative flex items-center ease-in-out rounded-lg max-xs:size-[300px] xs:size-[350px] sm:size-[450px] md:size-[550px] lg:size-[650px] xl:size-[750px] transform transition-transform duration-300 scale-100`}
      >
        <button
          onClick={handleImageChangeLeft}
          disabled={currentImageIndex === 0}
          className={
            "max-sm:size-8 sm:size-12 md:size-14 lg:size-16 xl:size-18 left-0 z-10 ml-4 max-lg:border-2 lg:border-4 border-black absolute rounded-full bg-custom-gray-300 flex justify-center items-center disabled:bg-opacity-50"
          }
        >
          <ChevronLeftIcon
            className={
              "max-sm:size-6 sm:size-10 md:size-12 lg:size-14 xl:size-16 text-black"
            }
          />
        </button>
        <div className="relative w-full h-full flex justify-center items-center">
          <motion.img
            key={`${currentImageIndex}`}
            className={
              "size-full inset-0 object-cover rounded-xl border-4 border-black"
            }
            src={`data:image/png;base64,${images[currentImageIndex].imageData}`}
            alt={selectedImageIndex}
            initial={{ x: direction === 1 ? 300 : -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direction === -1 ? -300 : 300, opacity: 0 }}
            transition={{
              x: { type: "spring", stiffness: 300, damping: 60 },
              opacity: { duration: 0.4 },
            }}
          />
        </div>
        <button
          onClick={handleImageChangeRight}
          disabled={currentImageIndex === images.length - 1}
          className={`max-sm:size-8 sm:size-12 md:size-14 lg:size-16 xl:size-18 z-10 ml-4 max-lg:border-2 lg:border-4 right-0 mr-4 border-black absolute rounded-full bg-custom-gray-300 flex justify-center items-center disabled:bg-opacity-50`}
        >
          <ChevronRightIcon
            className={
              "max-sm:size-6 sm:size-10 md:size-12 lg:size-14 xl:size-16 text-black"
            }
          />
        </button>
      </div>
    </motion.div>,
    document.body,
  );
};

export default ArticleImageModal;
