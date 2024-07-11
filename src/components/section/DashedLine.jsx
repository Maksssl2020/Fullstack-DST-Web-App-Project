import React from "react";

const DashedLine = () => {
  return (
    <div className="w-[650px] mt-4 flex items-center relative">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-2 border-dashed border-custom-orange-100"></div>
      </div>
      <div className="relative flex justify-between w-full">
        <span className="size-4 rounded-full bg-custom-orange-100"></span>
        <span className="size-4 rounded-full bg-custom-orange-100"></span>
      </div>
    </div>
  );
};

export default DashedLine;
