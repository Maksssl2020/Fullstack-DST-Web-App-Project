import React from "react";
import CommentIcon from "../../icons/CommentIcon";
import InstagramHeartIcon from "../../icons/InstagramHeartIcon";

const InstagramPostCard = ({ post, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="relative h-[350px] w-[350px] rounded-3xl "
    >
      <div className="group absolute h-full w-full rounded-3xl hover:cursor-pointer hover:bg-black hover:bg-opacity-40">
        <div className="hidden size-full justify-center gap-24 font-lato font-bold group-hover:flex group-hover:items-center group-hover:opacity-100">
          <p className="flex flex-col items-center text-white">
            <InstagramHeartIcon />
            {post.like_count}
          </p>
          <p className="flex flex-col items-center text-white">
            <CommentIcon />
            {post.comments_count}
          </p>
        </div>
      </div>
      <img
        src={post.media_type === "VIDEO" ? post.thumbnail_url : post.media_url}
        alt={post.caption}
        className="inset-0 h-full w-full object-cover rounded-3xl"
      />
    </div>
  );
};

export default InstagramPostCard;
