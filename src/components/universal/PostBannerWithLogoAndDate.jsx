import React from "react";

const PostBannerWithLogoAndDate = ({ authorName, date }) => {
  return (
    <div className="mt-6 h-[65px] w-full rounded-full bg-custom-gray-200">
      <div className="flex items-center justify-center gap-4">
        <div className="h-[60px] w-[60px]">
          <img
            className="inset-0 h-full w-full rounded-full object-cover"
            src="/assets/images/website-logo.jpg"
            alt=""
          />
        </div>
        <div className="flex flex-col items-center">
          <p className="font-lato text-lg font-bold">{authorName}</p>
          <p className="font-lato text-sm">-- {date} --</p>
        </div>
      </div>
    </div>
  );
};

export default PostBannerWithLogoAndDate;
