import React from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";

function ForumPostModal({ className, children }) {
  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      open
      className="fixed font-lato inset-0 flex items-center justify-center z-10"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={`fixed inset-0 bg-black bg-opacity-40 ${blur}`}
      ></motion.div>

      <motion.dialog
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 30, opacity: 0 }}
        open
        className={`z-10 ${className}`}
      >
        {children}
      </motion.dialog>
    </motion.div>,
    document.body,
  );
}

export default ForumPostModal;
