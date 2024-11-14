import React from "react";
import ForumPostPageForm from "../../components/form/ForumPostPageForm.jsx";
import ForumBanner from "../../components/banner/ForumBanner.jsx";
import AnimatedPage from "../../animation/AnimatedPage.jsx";

type ForumPostFormProps = {
  isEditing?: boolean;
};

const ForumPostForm = ({ isEditing }: ForumPostFormProps) => {
  return (
    <AnimatedPage>
      <div className="my-8 flex h-auto w-full flex-col items-center font-lato">
        <div className="flex h-auto flex-col items-center rounded-2xl bg-custom-blue-100 py-16 max-lg:w-[95%] lg:w-[925px] xl:w-[1250px]">
          <ForumBanner />
          <ForumPostPageForm isEditing={isEditing} />
        </div>
      </div>
    </AnimatedPage>
  );
};

export default ForumPostForm;
