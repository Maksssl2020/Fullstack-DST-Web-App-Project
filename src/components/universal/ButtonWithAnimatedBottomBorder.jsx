import React from "react";
import { motion } from "framer-motion";

const ButtonWithAnimatedBottomBorder = ({ name, isSelected, onClick }) => {
  return (
    <div className="flex flex-col">
      <button
        className={`uppercase text-xl ${isSelected ? "font-bold text-black" : "text-gray-500"}`}
        onClick={onClick}
      >
        {name}
      </button>
      {isSelected && (
        <motion.div
          layoutId={"selected-tab"}
          className={"h-1 w-full bg-custom-orange-200"}
        />
      )}
    </div>
  );
};

export default ButtonWithAnimatedBottomBorder;
