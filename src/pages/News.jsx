import React from "react";
import NewsPostSection from "../components/section/NewsPostSection";
import AnimatedPage from "../animation/AnimatedPage";

const News = () => {
  return (
    <AnimatedPage>
      <div className="w-full flex-col px-8 flex items-center justify-center bg-custom-gray-300 h-auto">
        <NewsPostSection />
      </div>
    </AnimatedPage>
  );
};

export default News;
