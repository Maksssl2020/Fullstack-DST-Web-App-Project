import React from "react";

const LineWithCircleOnLeftSide = ({
  lineColor = "gradient-from-red-to-yellow",
  circleStrokeColor = "bg-custom-red-100",
  circleFillColor = "bg-white",
}) => {
  return (
    <div className="w-[125px] flex items-center relative">
      <div className="absolute self-center inset-0 flex">
        <div className={`w-full h-1 ${lineColor}`}></div>
      </div>
      <div className="relative flex">
        <span
          className={`size-4 flex justify-center items-center rounded-full ${circleStrokeColor}`}
        >
          <span
            className={`w-[8px] h-[9px] rounded-full ${circleFillColor}`}
          ></span>
        </span>
      </div>
    </div>
  );
};

export default LineWithCircleOnLeftSide;
