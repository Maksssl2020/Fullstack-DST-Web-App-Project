import React from "react";

const ForumBanner = () => {
  return (
    <div className="w-[90%] px-8 h-[75px] flex justify-center items-center rounded-full bg-custom-blue-400">
      <p className="w-full h-1 bg-white bg-gradient-to-l from-25% from-white to-custom-blue-400 "></p>
      <h1 className="text-white text-center text-5xl w-[85%] font-bold">
        Tęczowe Forum
      </h1>
      <p className="w-full h-1 bg-white from-25% bg-gradient-to-r from-white to-custom-blue-400 "></p>
    </div>
  );
};

export default ForumBanner;
