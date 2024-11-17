import React from "react";
import UploadIcon from "../../icons/UploadIcon";
import { motion } from "framer-motion";

const UploadImageButton = ({ onClick }) => {
  return (
    <motion.button
      whileHover={{
        backgroundColor: "#FF5A5A",
        color: "#FFFFFF",
      }}
      onClick={onClick}
      className={
        "absolute inset-0 ml-auto mr-2 mt-2 flex size-10 items-center justify-center rounded-2xl border-2 border-custom-gray-400 bg-white text-custom-gray-400"
      }
    >
      <UploadIcon size={"size-7"} />
    </motion.button>
  );
};

export default UploadImageButton;
