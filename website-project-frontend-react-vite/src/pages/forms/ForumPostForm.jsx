import React from "react";
import ForumPostPageForm from "../../components/form/ForumPostPageForm.jsx";
import ForumBanner from "../../components/banner/ForumBanner.jsx";
import AnimatedPage from "../../animation/AnimatedPage.jsx";

const ForumPostForm = ({ isEditing }) => {
  return (
    <AnimatedPage>
      <div className="w-full h-auto font-lato flex my-8 flex-col items-center">
        <div className="bg-custom-blue-100 max-lg:w-[95%] lg:w-[925px] xl:w-[1250px] py-16 flex flex-col items-center h-auto rounded-2xl">
          <ForumBanner />
          <ForumPostPageForm isEditing={isEditing} />
        </div>
      </div>
    </AnimatedPage>
  );
};

export default ForumPostForm;
