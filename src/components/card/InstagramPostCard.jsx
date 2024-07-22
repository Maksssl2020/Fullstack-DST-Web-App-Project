import React from "react";
import HeartIcon from "./icons/HeartIcon.jsx";
import CommentIcon from "./icons/CommentIcon.jsx";

const InstagramPostCard = ({ post, onClick }) => {
  return (
    <div
      className="cursor-pointer h-[350px] w-[350px] rounded-3xl"
      onClick={onClick}
    >
      <img
        src={post.media_type === "VIDEO" ? post.thumbnail_url : post.media_url}
        alt={post.caption}
        className="inset-0 h-full w-full object-cover rounded-3xl"
      />
    </div>
  );
};

export default InstagramPostCard;
