import React from "react";

const ForumPostItem = ({
  content,
  bgColor,
  index,
  onClickAction,
  isChosen,
}) => {
  return (
    <button
      key={index}
      className={`w-full py-2 px-4 flex items-center rounded-full bg-custom-gray-100 border-2 h-[75px] ${isChosen === index ? "border-custom-blue-400" : "border-transparent"}`}
      onClick={() => onClickAction(index)}
    >
      <p
        className={`w-[75px] border-2 border-custom-blue-400 h-[50px] rounded-full ${bgColor}`}
      ></p>
      <p className="text-xl mx-auto">{content}</p>
    </button>
  );
};

export default ForumPostItem;
