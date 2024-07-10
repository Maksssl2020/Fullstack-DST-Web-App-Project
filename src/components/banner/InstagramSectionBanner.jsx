import React from "react";
import InstagramInformationList from "../list/InstagramInformationList.jsx";

const InstagramSectionBanner = () => {
  return (
    <div className="relative flex w-full justify-center">
      <div className="absolute left-0 z-10 flex h-[125px] w-[125px] translate-x-96 translate-y-3 items-center justify-center rounded-full bg-custom-gray-300">
        <div className="z-10 h-[100px] w-[100px]">
          <img
            className="inset-0 z-10 h-full w-full rounded-full object-cover"
            src="/assets/images/website-logo.jpg"
            alt=""
          />
        </div>
      </div>
      <div className="mt-8 flex h-[85px] w-[65%] items-center rounded-full bg-custom-gray-200">
        <p className="ml-56 font-lato text-5xl font-bold">dwie_strony_teczy</p>
        <div className="ml-auto mr-12 h-full w-[40%] rounded-full bg-custom-gray-300">
          <InstagramInformationList />
        </div>
      </div>
    </div>
  );
};

export default InstagramSectionBanner;
