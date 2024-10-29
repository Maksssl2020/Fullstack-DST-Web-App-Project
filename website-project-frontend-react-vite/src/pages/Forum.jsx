import React from "react";
import ForumBanner from "../components/banner/ForumBanner.jsx";
import ForumPostSection from "../components/section/ForumPostSection.jsx";
import AnimatedPage from "../animation/AnimatedPage.jsx";

const Forum = () => {
  return (
    <AnimatedPage>
      <div className="w-full h-auto font-lato flex my-8 flex-col items-center">
        <div className="bg-custom-blue-100 max-md:w-[95%] md:w-[725px] lg:w-[950px] xl:w-[1250px] py-12 flex flex-col items-center h-auto rounded-2xl">
          <ForumBanner />
          <ForumPostSection />
        </div>
      </div>
    </AnimatedPage>
  );
};

export default Forum;
