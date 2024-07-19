import React from "react";
import UserIcon from "../header/icons/UserIcon";

const Comment = ({ commentData }) => {
  const { author, userRole, content } = commentData;

  return (
    <div className="w-full p-4 h-[150px] justify-between flex items-center rounded-2xl bg-custom-gray-200">
      <div className="w-[100px] h-[115px] gap-2 border-2 flex flex-col justify-center items-center border-custom-blue-400 rounded-2xl">
        <p className="size-10 rounded-full bg-white flex items-center justify-center">
          <UserIcon size={"size-8"} />
        </p>
        <p className="font-bold text-sm">{author}</p>
      </div>
      <textarea
        readOnly
        className="w-[75%] focus:outline-none h-full mb-auto bg-transparent text-black resize-none text-lg placeholder:text-black"
      >
        {content}
      </textarea>
    </div>
  );
};

export default Comment;
