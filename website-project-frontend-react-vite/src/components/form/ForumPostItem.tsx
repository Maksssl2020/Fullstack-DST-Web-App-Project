import React from "react";
import { motion } from "framer-motion";

const ForumPostItem = ({
  content,
  bgColor,
  index,
  onClickAction,
  isChosen,
}) => {
  return (
    <motion.button
      initial={{ borderColor: "#FFFFFF" }}
      animate={
        isChosen === index
          ? { borderColor: "#16C2E0" }
          : { borderColor: "#FFFFFF" }
      }
      exit={{ borderColor: "#FFFFFF" }}
      key={index}
      className={`w-full py-2 px-4 flex items-center rounded-full bg-custom-gray-100 border-2 max-sm:h-[65px] sm:h-[75px]`}
      onClick={() => onClickAction(index)}
    >
      <p
        className={`w-[75px] border-2 border-custom-blue-400 h-[50px] rounded-full ${bgColor}`}
      ></p>
      <p className="max-xs:text-sm xs:text-lg sm:text-xl mx-auto">{content}</p>
    </motion.button>
  );
};

export default ForumPostItem;
