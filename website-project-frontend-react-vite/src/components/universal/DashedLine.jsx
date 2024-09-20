import React from "react";

const DashedLine = ({
  circleColor = "bg-custom-orange-100",
  lineColor = "border-custom-orange-100",
  width = "w-[650px]",
}) => {
  return (
    <div className={`mt-4 flex items-center relative ${width}`}>
      <div className="absolute inset-0 flex items-center">
        <div className={`w-full border-2 border-dashed ${lineColor}`}></div>
      </div>
      <div className="relative flex justify-between w-full">
        <span className={`size-4 rounded-full ${circleColor}`}></span>
        <span className={`size-4 rounded-full ${circleColor}`}></span>
      </div>
    </div>
  );
};

export default DashedLine;
