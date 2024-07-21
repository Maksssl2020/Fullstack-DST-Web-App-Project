import React from "react";
import ForumPostCardCommentsPanel from "./forum-post-card-items/ForumPostCardCommentsPanel";
import ForumPostCardMainDataPanel from "./forum-post-card-items/ForumPostCardMainDataPanel";

const ForumPostCard = ({ postData, handleDelete }) => {
  return (
    <div className="w-[85%] p-8 h-[650px] items-center justify-center flex gap-6 mt-8 bg-custom-blue-200 rounded-2xl">
      <ForumPostCardMainDataPanel
        postData={postData}
        handleDelete={handleDelete}
      />
      <ForumPostCardCommentsPanel postId={postData.id} />
    </div>
  );
};

export default ForumPostCard;
