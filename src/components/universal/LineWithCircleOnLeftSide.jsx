import React from "react";
import "./UniversalComponents.css";

const LineWithCircleOnLeftSide = () => {
  return (
    <div className="w-[125px] flex items-center relative">
      <div className="absolute self-center inset-0 flex">
        <div className="w-full h-1 gradient-from-red-to-yellow"></div>
      </div>
      <div className="relative flex">
        <span className="size-4 flex justify-center items-center rounded-full bg-custom-red-100">
          <span className="w-[8px] h-[9px] bg-white rounded-full"></span>
        </span>
      </div>
    </div>
  );
};

export default LineWithCircleOnLeftSide;
