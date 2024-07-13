import React from "react";
import "./UniversalComponents.css";

const LineWithCircleOnRightSide = () => {
  return (
    <div className="w-[125px] flex items-center relative">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full h-1 gradient-from-blue-violet"></div>
      </div>
      <div className="relative flex justify-end w-full">
        <span className="size-4 flex justify-center items-center rounded-full bg-custom-violet-100"></span>
      </div>
    </div>
  );
};

export default LineWithCircleOnRightSide;
