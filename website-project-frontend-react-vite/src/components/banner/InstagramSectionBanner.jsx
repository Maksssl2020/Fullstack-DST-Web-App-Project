import React from "react";
import InstagramInformationList from "../list/InstagramInformationList.jsx";
import InstagramIcon from "../../icons/InstagramIcon.jsx";
import { Link } from "react-router-dom";

const InstagramSectionBanner = ({ instagramUserData }) => {
  return (
    <div className="max-xl:w-[95%] xl:w-[1250px] 2xl:w-[1500px] relative max-lg:h-[75px] bg-custom-gray-200 rounded-full lg:h-[100px] self-center  flex justify-center  ">
      <div className="z-10 flex items-center absolute h-auto  max-lg:ml-6 lg:ml-12 left-0 bottom-0 top-1">
        <div className="ml-auto flex max-lg:size-[100px] lg:size-[125px] items-center justify-center rounded-full bg-custom-gray-300">
          <img
            className="inset-0 lg:size-[100px] max-lg:size-[75px] rounded-full object-cover"
            src="/assets/images/website-logo.jpg"
            alt=""
          />
        </div>
      </div>
      <div className="flex h-full ml-auto w-[80%] max-md:gap-4 justify-center items-center rounded-full bg-custom-gray-200">
        <p className=" max-md:text-2xl font-lato max-lg:text-xl max-xl:text-3xl xl:text-4xl font-extrabold">
          {instagramUserData?.username}
        </p>
        <Link
          to="https://www.instagram.com/dwie_strony_teczy/?ref=dishapages&hl=en"
          target="_blank"
          className="md:opacity-0"
        >
          <InstagramIcon className={"size-12 mr-4"} />
        </Link>
        <div className="ml-auto max-md:opacity-0 mr-8 h-full w-[45%] rounded-full bg-custom-gray-300">
          <InstagramInformationList instagramUserData={instagramUserData} />
        </div>
      </div>
    </div>
  );
};

export default InstagramSectionBanner;
