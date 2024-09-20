import React from "react";

const PostBannerWithLogoAndDate = ({ authorName, date }) => {
  return (
    <div className="mt-6 max-xl:h-[40px] xl:h-[65px] w-full rounded-full bg-custom-gray-200">
      <div className="flex items-center justify-center gap-4">
        <div className="max-xl:w-[40px] max-xl:h-[40px] xl:h-[60px] xl:w-[60px]">
          <img
            className="inset-0 h-full w-full rounded-full object-cover"
            src="/assets/images/website-logo.jpg"
            alt=""
          />
        </div>
        <div className="flex flex-col items-center">
          <p className="font-lato max-xl:text-sm xl:text-lg font-bold">
            {authorName}
          </p>
          <p className="font-lato max-xl:text-xs xl:text-sm">-- {date} --</p>
        </div>
      </div>
    </div>
  );
};

export default PostBannerWithLogoAndDate;
