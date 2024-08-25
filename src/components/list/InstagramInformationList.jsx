import React from "react";
import { Link } from "react-router-dom";
import InstagramIcon from "./icons/InstagramIcon";

const InstagramInformationList = ({ instagramUserData }) => {
  return (
    <ul className="flex size-full gap-8 px-4">
      <li className="flex items-center justify-center gap-2">
        <p className="bg-custom-gray-400 max-xl:size-2 xl:size-3 rounded-full"></p>
        <div className="flex flex-col items-center font-lato max-xl:text-sm xl:text-lg">
          <p>Postów</p>
          <p className="font-bold">{instagramUserData?.media_count}</p>
        </div>
      </li>
      <li className="flex items-center justify-center gap-2">
        <p className="bg-custom-gray-400 max-xl:size-2 xl:size-3 rounded-full"></p>
        <div className="flex flex-col items-center font-lato max-xl:text-sm xl:text-lg">
          <p>Obserwujących</p>
          <p className="font-bold">{instagramUserData?.followers_count}</p>
        </div>
      </li>
      <li className="flex flex-1 items-center justify-center">
        <Link
          to="https://www.instagram.com/dwie_strony_teczy/?ref=dishapages&hl=en"
          target="_blank"
        >
          <button className="flex max-lg:text-[0px] max-lg:justify-center h-[50px] items-center lg:gap-2 rounded-lg bg-custom-gray-200 p-2 font-lato max-xl:text-sm xl:text-lg">
            <InstagramIcon size={"max-lg:size-8 max-xl:size-6 xl:size-10"} />
            OBSERWUJ
          </button>
        </Link>
      </li>
    </ul>
  );
};

export default InstagramInformationList;
