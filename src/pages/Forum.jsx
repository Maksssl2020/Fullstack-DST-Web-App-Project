import React from "react";
import ForumBanner from "../components/banner/ForumBanner";
import ForumPostCard from "../components/card/ForumPostCard";

const Forum = () => {
  return (
    <div className="w-full h-auto font-lato flex my-8 flex-col items-center">
      <div className="bg-custom-blue-100 w-[1450px] py-16 flex flex-col items-center h-auto rounded-2xl">
        <ForumBanner />
        <ForumPostCard />
      </div>
    </div>
  );
};

export default Forum;
