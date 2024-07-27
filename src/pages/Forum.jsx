import React from "react";
import ForumBanner from "../components/banner/ForumBanner";
import ForumPostSection from "../components/section/ForumPostSection";
import AnimatedPage from "../animation/AnimatedPage";

const Forum = () => {
  return (
    <AnimatedPage>
      <div className="w-full h-auto font-lato flex my-8 flex-col items-center">
        <div className="bg-custom-blue-100 w-[1450px] py-16 flex flex-col items-center h-auto rounded-2xl">
          <ForumBanner />
          <ForumPostSection />
        </div>
      </div>
    </AnimatedPage>
  );
};

export default Forum;
