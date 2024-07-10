import React from "react";
import { Link } from "react-router-dom";
import InstagramIcon from "./icons/InstagramIcon";

const InstagramInformationList = () => {
  return (
    <ul className="flex h-full w-full gap-8 px-4">
      <li className="flex items-center justify-center gap-2">
        <p className="bg-custom-gray-400 size-3 rounded-full"></p>
        <div className="flex flex-col items-center font-lato text-lg">
          <p>Postów</p>
          <p className="font-bold">6</p>
        </div>
      </li>
      <li className="flex items-center justify-center gap-2">
        <p className="bg-custom-gray-400 size-3 rounded-full"></p>
        <div className="flex flex-col items-center font-lato text-lg">
          <p>Obserwujących</p>
          <p className="font-bold">333</p>
        </div>
      </li>
      <li className="flex flex-1 items-center justify-center">
        <Link
          to="https://www.instagram.com/dwie_strony_teczy/?ref=dishapages&hl=en"
          target="_blank"
        >
          <button className="flex h-[50px] items-center gap-2 rounded-lg bg-custom-gray-200 p-2 font-lato text-lg">
            <InstagramIcon />
            OBSERWUJ
          </button>
        </Link>
      </li>
    </ul>
  );
};

export default InstagramInformationList;
