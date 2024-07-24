import React from "react";
import InstagramInformationList from "../list/InstagramInformationList.jsx";
import InstagramIcon from "../list/icons/InstagramIcon";
import { Link } from "react-router-dom";

const InstagramSectionBanner = () => {
  return (
    <div className="relative max-lg:h-[75px] lg:h-[100px] self-center max-md:w-[700px] max-lg:w-[1150px] max-xl:w-[1450px] flex xl:w-[1850px] justify-center">
      <div className="z-10 flex items-center absolute h-auto max-md:w-[300px] max-lg:w-[375px] max-xl:w-[450px] xl:w-[550px] inset-0">
        <div className="ml-auto mr-12 flex max-lg:size-[100px] lg:size-[125px] items-center justify-center rounded-full bg-custom-gray-300">
          <img
            className="inset-0 lg:size-[100px] max-lg:size-[75px] rounded-full object-cover"
            src="/assets/images/website-logo.jpg"
            alt=""
          />
        </div>
      </div>
      <div className="flex h-full w-[65%] max-md:gap-4 justify-center items-center rounded-full bg-custom-gray-200">
        <p className="max-md:ml-96  max-lg:ml-40 max-xl:ml-48 xl:ml-48 md:w-[20%] max-md:text-2xl font-lato max-lg:text-xl max-xl:text-3xl xl:text-5xl font-extrabold">
          dwie_strony_teczy
        </p>
        <Link
          to="https://www.instagram.com/dwie_strony_teczy/?ref=dishapages&hl=en"
          target="_blank"
          className="md:opacity-0"
        >
          <InstagramIcon size={"size-10 mr-4"} />
        </Link>
        <div className="ml-auto max-md:opacity-0 mr-8 h-full w-[45%] rounded-full bg-custom-gray-300">
          <InstagramInformationList />
        </div>
      </div>
    </div>
  );
};

export default InstagramSectionBanner;
