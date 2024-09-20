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
        <CloseIcon size={"size-24"} />
      </button>
      <div
        className={`relative flex items-center ease-in-out rounded-lg size-[750px] transform transition-transform duration-300 scale-100`}
      >
        <button
          onClick={handleImageChangeLeft}
          disabled={currentImageIndex === 0}
          className={
            "size-18 left-0 z-10 ml-4 border-4 border-black absolute rounded-full bg-custom-gray-300 flex justify-center items-center disabled:bg-opacity-50"
          }
        >
          <ChevronLeftIcon className={"size-16 text-black"} />
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
          className={`size-18 right-0 mr-4 border-4 border-black absolute rounded-full bg-custom-gray-300 flex justify-center items-center disabled:bg-opacity-50`}
        >
          <ChevronRightIcon className={"size-16 text-black"} />
        </button>
      </div>
    </motion.div>,
    document.body,
  );
};

export default ArticleImageModal;
