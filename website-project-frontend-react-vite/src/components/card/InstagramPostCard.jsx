import React from "react";
import CommentIconFilled from "../../icons/CommentIconFilled.jsx";
import InstagramHeartIcon from "../../icons/InstagramHeartIcon.jsx";
import { motion } from "framer-motion";

const InstagramPostCard = ({ post, onClick }) => {
  const [isHovered, setHovered] = React.useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      className="relative max-sm:size-[200px] sm:size-[225px] md:size-[285px] lg:size-[350px] rounded-3xl hover:cursor-pointer"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={isHovered ? { opacity: 0.5 } : { opacity: 0 }}
        className="absolute h-full w-full rounded-3xl bg-black"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
        className="absolute flex items-center h-full w-full justify-center max-sm:gap-12 sm:gap-16 md:gap-20 lg:gap-24 font-lato font-bold"
      >
        <p className="flex flex-col items-center text-white">
          <InstagramHeartIcon
            className={"max-sm:size-6 sm:size-8 md:size-10 lg:size-12"}
          />
          {post.like_count}
        </p>
        <p className="flex flex-col items-center text-white">
          <CommentIconFilled
            className={"max-sm:size-6 sm:size-8 md:size-10 lg:size-12"}
          />
          {post.comments_count}
        </p>
      </motion.div>
      <img
        src={post.media_type === "VIDEO" ? post.thumbnail_url : post.media_url}
        alt={post.caption}
        className="inset-0 h-full w-full object-cover rounded-3xl"
      />
    </div>
  );
};

export default InstagramPostCard;
