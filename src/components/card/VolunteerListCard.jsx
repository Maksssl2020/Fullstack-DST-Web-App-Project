import React from "react";

const VolunteerListCard = ({ number, title }) => {
  return (
    <li className="w-full h-[65px] border-4 text-xl border-custom-gray-300 relative flex rounded-2xl">
      <div className="w-[20%] absolute rounded-xl font-bold inset-0 flex justify-center items-center h-full bg-custom-gray-300 text-white">
        {number}
      </div>
      <div className="w-[85%] bg-white ml-auto font-bold flex justify-center items-center rounded-xl h-full">
        {title}
      </div>
    </li>
  );
};

export default VolunteerListCard;
