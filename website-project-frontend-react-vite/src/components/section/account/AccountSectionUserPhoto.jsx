import React from "react";
import UploadIcon from "../../../icons/UploadIcon.jsx";
import { motion } from "framer-motion";

const AccountSectionUserPhoto = ({
  className,
  imageTitle,
  image,
  openModal,
  children,
}) => {
  return (
    <div className={`max-md:w-full h-full flex flex-col p-4  ${className}`}>
      <p className="ml-3 text-xl mb-2">{imageTitle}</p>
      <div className="w-full h-full relative p-4 flex items-center justify-center border-4 border-custom-gray-300 rounded-3xl">
        <motion.button
          whileHover={{
            backgroundColor: "#FF5A5A",
            color: "#FFFFFF",
          }}
          onClick={() => openModal(imageTitle)}
          className={
            "size-10 rounded-2xl text-custom-gray-400 absolute inset-0 border-2 border-custom-gray-400 flex justify-center bg-white items-center ml-auto mr-2 mt-2"
          }
        >
          <UploadIcon size={"size-7"} />
        </motion.button>
        {image === null ? (
          <h2 className="italic font-bold text-3xl">BRAK</h2>
        ) : (
          <img
            className="h-[75%] w-[80%] inset-0 object-cover rounded-3xl"
            src={`data:image/png;base64,${image}`}
            alt={imageTitle}
          />
        )}
      </div>
      {children}
    </div>
  );
};

export default AccountSectionUserPhoto;
