import React from "react";
import Comment from "../../comment/Comment.jsx";
import "./ForumPostCardCommentsPanel.css";
import Spinner from "../../universal/Spinner.jsx";
import useForumPostComments from "../../../hooks/queries/useForumPostComments.js";
import AddCommentField from "../../comment/AddCommentField.jsx";

const ForumPostCardCommentsPanel = ({ postId, isInModal = false }) => {
  const { forumPostComments, fetchingForumPostComments } =
    useForumPostComments(postId);

  if (fetchingForumPostComments) {
    return <Spinner />;
  }

  console.log(forumPostComments);

  return (
    <div
      className={`w-full justify-between flex flex-col p-4 rounded-2xl bg-custom-gray-100 ${isInModal ? "h-auto" : "h-full"}`}
    >
      {!isInModal && (
        <div className="w-full h-[50px] flex text-white font-bold items-center justify-center text-4xl rounded-full bg-custom-blue-400">
          Komentarze
        </div>
      )}
      <div
        className={`h-[70%] space-y-4 px-2 w-full ${isInModal ? "overflow-hidden" : "overflow-y-scroll"}`}
      >
        {forumPostComments?.map((commentData, index) => (
          <Comment key={index} commentData={commentData} postId={postId} />
        ))}
      </div>
      {!isInModal && (
        <AddCommentField className={"w-full h-[65px] mt-4"} postId={postId} />
      )}
    </div>
  );
};

export default ForumPostCardCommentsPanel;
