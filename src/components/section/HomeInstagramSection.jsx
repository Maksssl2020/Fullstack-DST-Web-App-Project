import React from "react";
import InstagramSectionBanner from "../banner/InstagramSectionBanner.jsx";
import InstagramPostCard from "../card/InstagramPostCard.jsx";

const HomeInstagramSection = () => {
  return (
    <div className="flex h-[600px] w-full flex-col rounded-lg bg-custom-blue-200">
      <InstagramSectionBanner />
      <div className="mt-10 flex h-[375px] w-full items-center justify-center gap-12 bg-custom-gray-200">
        <InstagramPostCard />
        <InstagramPostCard />
        <InstagramPostCard />
        <InstagramPostCard />
      </div>
    </div>
  );
};

export default HomeInstagramSection;
