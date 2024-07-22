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

// <div className="relative h-[350px] w-[350px] rounded-lg">
//     <div className="group absolute h-full w-full rounded-lg hover:cursor-pointer hover:bg-black hover:bg-opacity-40">
//         <div
//             className="hidden size-full justify-center gap-24 font-lato font-bold group-hover:flex group-hover:items-center group-hover:opacity-100">
//             <p className="flex flex-col items-center text-white">
//                 <HeartIcon/>
//                 1000
//             </p>
//             <p className="flex flex-col items-center text-white">
//                 <CommentIcon/>
//                 333
//             </p>
//         </div>
//     </div>
//     <img
//         className="inset-0 h-full w-full object-cover"
//         src="/assets/images/test_insta_post_bg.png"
//         alt=""
//     />
// </div>

export default InstagramPostCard;
