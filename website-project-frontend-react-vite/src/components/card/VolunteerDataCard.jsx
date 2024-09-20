import React from "react";
import { PeriodOfDays } from "../../helpers/Date.js";

const VolunteerListCard = ({ accountCreationDate, username }) => {
  return (
    <li className="w-full h-[65px] border-4 text-xl border-custom-gray-300 relative flex rounded-2xl">
      <div className="w-[20%] absolute rounded-xl font-bold inset-0 flex justify-center items-center h-full bg-custom-gray-300 text-white">
        {`${PeriodOfDays(accountCreationDate)} dni`}
      </div>
      <div className="w-[85%] bg-white ml-auto font-bold flex justify-center items-center rounded-xl h-full">
        {username}
      </div>
    </li>
  );
};

export default VolunteerListCard;
