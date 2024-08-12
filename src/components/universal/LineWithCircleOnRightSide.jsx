import React from "react";
import "./UniversalComponents.css";

const LineWithCircleOnRightSide = ({
  lineColor = "gradient-from-blue-violet",
  circleColor = "bg-custom-violet-100",
}) => {
  return (
    <div className="w-[125px] flex items-center relative">
      <div className="absolute inset-0 flex items-center">
        <div className={`w-full h-1 ${lineColor}`}></div>
      </div>
      <div className="relative flex justify-end w-full">
        <span
          className={`size-4 flex justify-center items-center rounded-full ${circleColor}`}
        ></span>
      </div>
    </div>
  );
};

export default LineWithCircleOnRightSide;
