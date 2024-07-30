import React from "react";
import UploadIcon from "../../../icons/UploadIcon";

const AccountSectionUserPhoto = ({
  imageTitle,
  mainImageSrc,
  bottomDataTitle,
  bottomData,
  openModal,
}) => {
  return (
    <div className="w-[45%] ml-auto h-full flex flex-col p-4">
      <p className="ml-3 text-xl mb-2">{imageTitle}</p>
      <div className="w-full relative h-[70%] flex items-center justify-center border-4 border-custom-gray-300 rounded-3xl">
        <button
          onClick={() => openModal(imageTitle)}
          className="size-10 rounded-2xl absolute inset-0 border-2 border-black flex justify-center bg-white items-center ml-auto mr-2 mt-2"
        >
          <UploadIcon size={"size-7"} />
        </button>
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
        {bottomData}
      </p>
    </div>
  );
};

export default AccountSectionUserPhoto;
