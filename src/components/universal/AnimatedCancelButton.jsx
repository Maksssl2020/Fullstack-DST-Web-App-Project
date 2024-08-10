import React from "react";
import { motion } from "framer-motion";
import CloseIcon from "../drawer/icons/CloseIcon";

const AnimatedCancelButton = ({ className, onClick, iconSize }) => {
  return (
    <motion.button
      whileHover={{ rotate: 180, transition: { duration: 0.3 } }}
      className={className}
      onClick={onClick}
    >
      <CloseIcon size={iconSize} />
    </motion.button>
  );
};

export default AnimatedCancelButton;
