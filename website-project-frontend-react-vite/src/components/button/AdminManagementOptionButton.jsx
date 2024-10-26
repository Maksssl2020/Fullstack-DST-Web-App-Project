import React from "react";
import { motion } from "framer-motion";

function AdminManagementOptionButton({ onClick, children }) {
  return (
    <div className={"w-full h-full flex items-center justify-center"}>
      <motion.button
        whileHover={{ scale: 1.05 }}
        onClick={onClick}
        className="bg-white text-xl py-2 flex items-center justify-center w-[300px] h-[85px] border-8 border-custom-pink-200 rounded-2xl"
      >
        {children}
      </motion.button>
    </div>
  );
}

export default AdminManagementOptionButton;
