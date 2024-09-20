import React from "react";

const Spinner = () => {
  return (
    <div className="fixed font-lato inset-0 flex items-center justify-center z-20">
      <div className="fixed inset-0 bg-black backdrop-blur-lg bg-opacity-40 z-20"></div>
      <div className="border-custom-gray-300 size-16 animate-spin rounded-full border-8 border-t-custom-orange-200 z-20"></div>
    </div>
  );
};

export default Spinner;
