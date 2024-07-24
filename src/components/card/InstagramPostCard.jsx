import React from "react";

const InstagramPostCard = ({ post, onClick }) => {
  return (
    <div
      className="cursor-pointer max-lg:size-[250px] max-2xl:size-[300px] 2xl:size-[350px] rounded-3xl"
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
