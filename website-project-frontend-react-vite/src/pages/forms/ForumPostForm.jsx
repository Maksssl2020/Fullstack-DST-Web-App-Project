import React from "react";
import ForumPostPageForm from "../../components/form/ForumPostPageForm.jsx";
import ForumBanner from "../../components/banner/ForumBanner.jsx";
import AnimatedPage from "../../animation/AnimatedPage.jsx";

const ForumPostForm = () => {
  return (
    <AnimatedPage>
      <div className="w-full h-auto font-lato flex my-8 flex-col items-center">
        <div className="bg-custom-blue-100 w-[1450px] py-16 flex flex-col items-center h-auto rounded-2xl">
          <ForumBanner />
          <ForumPostPageForm />
        </div>
      </div>
    </AnimatedPage>
  );
};

export default ForumPostForm;
