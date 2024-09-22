import React from "react";
import CommentIcon from "../../icons/CommentIcon.jsx";
import InstagramHeartIcon from "../../icons/InstagramHeartIcon.jsx";
import { motion } from "framer-motion";

const InstagramPostCard = ({ post, onClick }) => {
  const [isHovered, setHovered] = React.useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      className="relative h-[350px] w-[350px] rounded-3xl hover:cursor-pointer"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={isHovered ? { opacity: 0.6 } : { opacity: 0 }}
        className="absolute h-full w-full rounded-3xl"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
        className="absolute flex items-center h-full w-full justify-center gap-24 font-lato font-bold"
      >
        <p className="flex flex-col items-center text-white">
          <InstagramHeartIcon />
          {post.like_count}
        </p>
        <p className="flex flex-col items-center text-white">
          <CommentIcon />
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
