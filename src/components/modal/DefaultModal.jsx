import React from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";

const DefaultModal = ({ title, subtitle, children }) => {
  return createPortal(
    <motion.dialog
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 30, opacity: 0 }}
      open
      className="fixed font-lato inset-0 flex items-center justify-center z-10"
    >
      <div className="fixed inset-0 bg-black backdrop-blur-lg bg-opacity-40"></div>
      <div className="bg-custom-gray-100 border-custom-orange-200 border-4 gap-6 w-[650px] flex flex-col items-center h-auto p-8 rounded-2xl z-10">
        <h2 className="text-4xl font-bold">{title}</h2>
        <p className="text-2xl">{subtitle}</p>
        {children}
      </div>
    </motion.dialog>,
    document.body,
  );
};

export default DefaultModal;
