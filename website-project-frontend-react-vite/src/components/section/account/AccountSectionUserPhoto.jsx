import React from "react";
import UploadIcon from "../../../icons/UploadIcon.jsx";
import { motion } from "framer-motion";
import { DateParser } from "../../../helpers/Date.js";

const AccountSectionUserPhoto = ({
  className,
  imageTitle,
  mainImageSrc,
  bottomDataTitle,
  bottomData,
  openModal,
}) => {
  return (
    <div
      className={`max-md:w-full md:w-[45%] xl:ml-auto h-full flex flex-col p-4 ${className}`}
    >
      <p className="ml-3 text-xl mb-2">{imageTitle}</p>
      <div className="w-full relative h-[70%] flex items-center justify-center border-4 border-custom-gray-300 rounded-3xl">
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
        {mainImageSrc === null ? (
          <h2 className="italic font-bold text-3xl">BRAK</h2>
        ) : (
          <img
            className="size-[75%] inset-0 object-cover rounded-3xl"
            src={`data:image/png;base64,${mainImageSrc}`}
            alt={imageTitle}
          />
        )}
      </div>
      <p className="ml-3 mt-auto text-xl mb-2">{bottomDataTitle}</p>
      <p className="w-full flex justify-center items-center text-2xl rounded-2xl h-[60px] border-4 border-custom-gray-300">
        {bottomDataTitle.includes("Data") ? DateParser(bottomData) : bottomData}
      </p>
    </div>
  );
};

export default AccountSectionUserPhoto;
