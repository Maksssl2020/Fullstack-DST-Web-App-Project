import React from "react";

const MainBannerWithoutLogo = ({ bannerTitle }) => {
  return (
    <div className="flex max-sm:w-[95%] max-lg:w-[80%] h-[75px] max-2xl:w-[65%] 2xl:w-1/2 justify-center self-center rounded-full bg-custom-gray-100">
      <div className="flex h-full w-4/5 items-center justify-between rounded-full bg-white px-4">
        <p className="h-0.5 max-sm:w-4 sm:w-8 bg-black"></p>
        <p className="font-lato max-sm:text-lg max-md:text-2xl max-xl:text-4xl xl:text-5xl font-extrabold">
          {bannerTitle}
        </p>
        <p className="h-0.5 max-sm:w-4 sm:w-8 bg-black"></p>
      </div>
    </div>
  );
};

export default MainBannerWithoutLogo;
