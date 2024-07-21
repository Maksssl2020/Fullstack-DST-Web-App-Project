import React from "react";
import ForumPostPageForm from "../components/form/ForumPostPageForm";
import ForumBanner from "../components/banner/ForumBanner";

const ForumPostForm = () => {
  return (
    <div className="w-full h-auto font-lato flex my-8 flex-col items-center">
      <div className="bg-custom-blue-100 w-[1450px] py-16 flex flex-col items-center h-auto rounded-2xl">
        <ForumBanner />
        <ForumPostPageForm />
      </div>
    </div>
  );
};

export default ForumPostForm;
