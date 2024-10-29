import React from "react";
import { motion } from "framer-motion";

function IconButton({ className, onClick, children }) {
  return (
    <motion.button
      whileHover={{ scale: 1.15 }}
      onClick={onClick}
      className={`text-black rounded-full flex justify-center items-center bg-white ${className}`}
    >
      {children}
    </motion.button>
  );
}

export default IconButton;
