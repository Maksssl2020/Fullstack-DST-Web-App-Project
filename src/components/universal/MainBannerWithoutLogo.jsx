import React from "react";

const MainBannerWithoutLogo = ({ bannerTitle }) => {
  return (
    <div className="mt-8 flex h-[75px] w-1/2 justify-center self-center rounded-full bg-custom-gray-100">
      <div className="flex h-full w-4/5 items-center justify-between rounded-full bg-white px-4">
        <p className="h-0.5 w-8 bg-black"></p>
        <p className="font-lato text-5xl font-bold">{bannerTitle}</p>
        <p className="h-0.5 w-8 bg-black"></p>
      </div>
    </div>
  );
};

export default MainBannerWithoutLogo;
