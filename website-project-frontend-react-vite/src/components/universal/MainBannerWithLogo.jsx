import React from "react";
import { useNavigate } from "react-router-dom";

const MainBannerWithLogo = ({
  mainContainerClassName,
  imageContainerClassName,
  textClassName,
}) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate("/")}
      className={`ml-6 flex items-center justify-center hover:cursor-pointer gap-4 rounded-full bg-custom-gray-100 ${mainContainerClassName}`}
    >
      <div className={imageContainerClassName}>
        <img
          className="inset-0 size-full rounded-full object-cover"
          src="/assets/images/website-logo.jpg"
          alt=""
        />
      </div>
      <h2 className={`max-xl:text-xl xl:text-2xl font-bold ${textClassName}`}>
        DWIE strony TĘCZY
      </h2>
    </div>
  );
};

export default MainBannerWithLogo;
